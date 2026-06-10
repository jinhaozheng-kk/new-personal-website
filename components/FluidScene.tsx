"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D fluid blob — an icosphere displaced by layered simplex noise in the
 * vertex shader, shaded with an iridescent fresnel in the fragment shader.
 * Reacts to mouse position and scroll progress (non-linear easing).
 */
export default function FluidScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uIntensity: { value: 0.85 },
    };

    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying float vDisp;

      // simplex noise (Ashima)
      vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
      vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
      vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        float t = uTime * 0.35;
        // mouse warps the noise field — fluid follows the cursor
        vec3 warp = vec3(uMouse * 1.5, uScroll * 2.0);
        float n1 = snoise(normal * 1.2 + warp * 0.4 + vec3(t));
        float n2 = snoise(normal * 3.5 - vec3(t * 1.6)) * 0.35;
        float n3 = snoise(normal * 7.0 + vec3(t * 0.7)) * 0.12;
        float disp = (n1 + n2 + n3) * uIntensity * (1.0 + uScroll * 0.6);
        vDisp = disp;
        vec3 newPos = position + normal * disp;
        vNormal = normalize(normalMatrix * normal);
        vPos = (modelViewMatrix * vec4(newPos, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal;
      varying vec3 vPos;
      varying float vDisp;

      void main() {
        vec3 viewDir = normalize(-vPos);
        float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 2.0);

        vec3 cyan    = vec3(0.49, 0.976, 1.0);
        vec3 violet  = vec3(0.545, 0.36, 0.965);
        vec3 magenta = vec3(1.0, 0.176, 0.573);
        vec3 deep    = vec3(0.02, 0.008, 0.05);

        float band = sin(vDisp * 6.0 + uTime * 0.8) * 0.5 + 0.5;
        vec3 col = mix(violet, cyan, band);
        col = mix(col, magenta, smoothstep(0.3, 1.0, vDisp + 0.3));
        col = mix(deep, col, 0.25 + fresnel * 0.9);
        col += fresnel * fresnel * vec3(0.49, 0.976, 1.0) * 0.6;

        gl_FragColor = vec4(col, 0.96);
      }
    `;

    const geometry = new THREE.IcosahedronGeometry(2, 96);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // orbiting wireframe ring for depth
    const ringGeo = new THREE.TorusGeometry(3.4, 0.012, 8, 160);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x7df9ff,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.9, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0xff2d92, transparent: true, opacity: 0.18 })
    );
    ring2.rotation.x = Math.PI / 1.7;
    ring2.rotation.y = 0.5;
    scene.add(ring2);

    // particle field
    const pCount = 700;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const points = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.02, transparent: true, opacity: 0.7 })
    );
    scene.add(points);

    // interaction state (eased — non-linear follow)
    const target = { x: 0, y: 0, scroll: 0 };
    const eased = { x: 0, y: 0, scroll: 0 };

    const onMouse = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      target.scroll = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // exponential easing — fluid lag
      eased.x += (target.x - eased.x) * 0.04;
      eased.y += (target.y - eased.y) * 0.04;
      eased.scroll += (target.scroll - eased.scroll) * 0.06;

      uniforms.uTime.value = t;
      uniforms.uMouse.value.set(eased.x, eased.y);
      uniforms.uScroll.value = eased.scroll;

      blob.rotation.y = t * 0.12 + eased.x * 0.5;
      blob.rotation.x = Math.sin(t * 0.08) * 0.3 + eased.y * 0.3;
      blob.position.y = Math.sin(t * 0.5) * 0.15 - eased.scroll * 1.2;

      ring.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.07;
      points.rotation.y = t * 0.02;

      camera.position.x = eased.x * 0.4;
      camera.position.y = eased.y * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
