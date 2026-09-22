import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, RotateCcw } from 'lucide-react';

export default function Hero3D({ onExploreSection }) {
  const mountRef = useRef(null);
  const [isScattered, setIsScattered] = useState(false);
  const [scatterCountdown, setScatterCountdown] = useState(0);

  // Letter transforms for J, C, J
  const [letterTransforms, setLetterTransforms] = useState([
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
  ]);

  const scatterTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Trigger scatter only when explicitly invoked by user click
  const triggerScatter = () => {
    if (isScattered) return;
    setIsScattered(true);
    setScatterCountdown(3);

    // Random explosive scatter vector for each letter
    setLetterTransforms([
      {
        x: (Math.random() - 0.75) * 320,
        y: (Math.random() - 0.5) * 240,
        z: Math.random() * 250,
        rotX: (Math.random() - 0.5) * 140,
        rotY: (Math.random() - 0.5) * 200,
        rotZ: (Math.random() - 0.5) * 100,
        scale: 0.7 + Math.random() * 0.4,
      },
      {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.8) * 300,
        z: Math.random() * 260,
        rotX: (Math.random() - 0.5) * 200,
        rotY: (Math.random() - 0.5) * 160,
        rotZ: (Math.random() - 0.5) * 140,
        scale: 0.6 + Math.random() * 0.5,
      },
      {
        x: (Math.random() - 0.25) * 340,
        y: (Math.random() - 0.5) * 260,
        z: Math.random() * 230,
        rotX: (Math.random() - 0.5) * 160,
        rotY: (Math.random() - 0.5) * 180,
        rotZ: (Math.random() - 0.5) * 120,
        scale: 0.7 + Math.random() * 0.4,
      },
    ]);

    // 3s Countdown
    let remaining = 3;
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      remaining -= 1;
      setScatterCountdown(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(countdownIntervalRef.current);
      }
    }, 1000);

    // 3 seconds return timer
    if (scatterTimeoutRef.current) clearTimeout(scatterTimeoutRef.current);
    scatterTimeoutRef.current = setTimeout(() => {
      setLetterTransforms([
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
      ]);
      setIsScattered(false);
    }, 3000);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Monochrome Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 60);
    pointLight.position.set(12, 16, 16);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x666666, 1.2, 60);
    pointLight2.position.set(-16, -12, 12);
    scene.add(pointLight2);

    // Create Floating 3D Cubes (they float smoothly without auto-scattering letters)
    const cubes = [];
    const numCubes = 15;
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    for (let i = 0; i < numCubes; i++) {
      const size = 1.1 + Math.random() * 1.7;
      const geometry = new THREE.BoxGeometry(size, size, size);

      const isWire = i % 2 === 0;
      const material = isWire
        ? new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.35,
          })
        : new THREE.MeshStandardMaterial({
            color: 0x141414,
            roughness: 0.25,
            metalness: 0.8,
            transparent: true,
            opacity: 0.85,
          });

      const mesh = new THREE.Mesh(geometry, material);

      if (!isWire) {
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 })
        );
        mesh.add(line);
      }

      mesh.position.set(
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14
      );

      const speed = 0.012 + Math.random() * 0.018;
      mesh.userData = {
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        vz: (Math.random() - 0.5) * speed,
        rotVx: (Math.random() - 0.5) * 0.018,
        rotVy: (Math.random() - 0.5) * 0.018,
      };

      cubes.push(mesh);
      cubeGroup.add(mesh);
    }

    // Mouse movement for subtle 3D parallax
    const mouse = new THREE.Vector2(0, 0);
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop (cubes float, but NEVER auto-trigger scatter)
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.position.x += cube.userData.vx;
        cube.position.y += cube.userData.vy;
        cube.position.z += cube.userData.vz;

        cube.rotation.x += cube.userData.rotVx;
        cube.rotation.y += cube.userData.rotVy;

        // Bounce off bounds
        if (Math.abs(cube.position.x) > 18) cube.userData.vx *= -1;
        if (Math.abs(cube.position.y) > 11) cube.userData.vy *= -1;
        if (Math.abs(cube.position.z) > 9) cube.userData.vz *= -1;
      });

      // Subtle mouse parallax
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const letters = ['J', 'C', 'J'];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      {/* 3D WebGL Background Canvas with floating cubes */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Center JCJ: Stays completely still until mouse clicks/selects the text */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          onClick={triggerScatter}
          className="group flex items-center gap-3 sm:gap-7 md:gap-12 cursor-pointer p-4 transition-transform active:scale-95"
          title="클릭하여 글씨를 흩어보세요"
        >
          {letters.map((char, index) => {
            const transform = letterTransforms[index];
            return (
              <span
                key={index}
                style={{
                  transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px) rotateX(${transform.rotX}deg) rotateY(${transform.rotY}deg) rotateZ(${transform.rotZ}deg) scale(${transform.scale})`,
                  transition: isScattered
                    ? 'transform 0.45s cubic-bezier(0.12, 1, 0.28, 1)'
                    : 'transform 2.5s cubic-bezier(0.18, 0.85, 0.2, 1)',
                }}
                className={`inline-block font-black text-8xl sm:text-9xl md:text-[11rem] tracking-tight text-white select-none transition-colors duration-300 ${
                  isScattered
                    ? 'text-neutral-400 drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]'
                    : 'drop-shadow-[0_0_40px_rgba(255,255,255,0.35)] group-hover:text-neutral-200 group-hover:drop-shadow-[0_0_60px_rgba(255,255,255,0.6)]'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Minimal Monochrome Tag & Status */}
        <div className="mt-8 flex flex-col items-center text-center space-y-3">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-neutral-400 border border-neutral-800/80 bg-neutral-950/70 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>SPATIAL INTERACTION LAB</span>
          </div>

          {/* Scatter status or subtle hint */}
          <div className="min-h-[28px] flex items-center">
            {isScattered ? (
              <span className="flex items-center gap-1.5 font-mono text-xs text-neutral-200 bg-neutral-900 border border-neutral-700 px-3.5 py-1 rounded-md shadow-lg">
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>3초 후 원위치 재배치 중 ({scatterCountdown}s)</span>
              </span>
            ) : (
              <span className="font-mono text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer" onClick={triggerScatter}>
                [ 텍스트를 클릭하면 흩어집니다 ]
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section Triggers (Without fixed topbar) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 p-1 rounded-full border border-neutral-800/90 bg-neutral-950/90 backdrop-blur-md shadow-2xl">
          <button
            onClick={() => onExploreSection('about')}
            className="text-xs font-mono px-4 py-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
          >
            팀소개
          </button>
          <span className="text-neutral-700">/</span>
          <button
            onClick={() => onExploreSection('members')}
            className="text-xs font-mono px-4 py-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
          >
            팀원소개
          </button>
          <span className="text-neutral-700">/</span>
          <button
            onClick={() => onExploreSection('project_01')}
            className="text-xs font-mono px-4 py-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all"
          >
            project_01
          </button>
        </div>

        <button
          onClick={() => onExploreSection('about')}
          className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
