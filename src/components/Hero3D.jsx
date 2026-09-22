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

  // Trigger scatter function
  const triggerScatter = () => {
    if (isScattered) return;
    setIsScattered(true);
    setScatterCountdown(3);

    // Random explosive scatter vector for each of the 3 letters
    setLetterTransforms([
      {
        x: (Math.random() - 0.7) * 280,
        y: (Math.random() - 0.5) * 220,
        z: Math.random() * 200,
        rotX: (Math.random() - 0.5) * 120,
        rotY: (Math.random() - 0.5) * 180,
        rotZ: (Math.random() - 0.5) * 90,
        scale: 0.7 + Math.random() * 0.5,
      },
      {
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.7) * 260,
        z: Math.random() * 220,
        rotX: (Math.random() - 0.5) * 180,
        rotY: (Math.random() - 0.5) * 140,
        rotZ: (Math.random() - 0.5) * 120,
        scale: 0.6 + Math.random() * 0.6,
      },
      {
        x: (Math.random() - 0.3) * 300,
        y: (Math.random() - 0.5) * 240,
        z: Math.random() * 190,
        rotX: (Math.random() - 0.5) * 140,
        rotY: (Math.random() - 0.5) * 160,
        rotZ: (Math.random() - 0.5) * 100,
        scale: 0.7 + Math.random() * 0.5,
      },
    ]);

    // Countdown interval
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 50);
    pointLight.position.set(10, 15, 15);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x777777, 1.2, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // Create Floating 3D Cubes
    const cubes = [];
    const numCubes = 14;
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    for (let i = 0; i < numCubes; i++) {
      const size = 1.2 + Math.random() * 1.6;
      const geometry = new THREE.BoxGeometry(size, size, size);

      // Monochrome materials: Wireframe + Translucent Glassy Face
      const isWire = i % 2 === 0;
      const material = isWire
        ? new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.35 + Math.random() * 0.3,
          })
        : new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.2,
            metalness: 0.8,
            transparent: true,
            opacity: 0.85,
          });

      const mesh = new THREE.Mesh(geometry, material);

      // Add edge highlight to solid cubes
      if (!isWire) {
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
        );
        mesh.add(line);
      }

      // Initial positions distributed around space
      mesh.position.set(
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12
      );

      // Velocity for autonomous floating & collision
      const speed = 0.015 + Math.random() * 0.02;
      mesh.userData = {
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        vz: (Math.random() - 0.5) * speed,
        rotVx: (Math.random() - 0.5) * 0.02,
        rotVy: (Math.random() - 0.5) * 0.02,
        size: size,
      };

      cubes.push(mesh);
      cubeGroup.add(mesh);
    }

    // Raycaster & Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationId;
    let collisionCooldown = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (collisionCooldown > 0) collisionCooldown--;

      // Floating Cubes Physics & Collision with Center (Letters)
      cubes.forEach((cube) => {
        cube.position.x += cube.userData.vx;
        cube.position.y += cube.userData.vy;
        cube.position.z += cube.userData.vz;

        cube.rotation.x += cube.userData.rotVx;
        cube.rotation.y += cube.userData.rotVy;

        // Bounce off bounds
        if (Math.abs(cube.position.x) > 18) cube.userData.vx *= -1;
        if (Math.abs(cube.position.y) > 10) cube.userData.vy *= -1;
        if (Math.abs(cube.position.z) > 8) cube.userData.vz *= -1;

        // Collision detection with center region (where JCJ sits)
        const distToCenter = Math.sqrt(
          cube.position.x * cube.position.x +
          cube.position.y * cube.position.y +
          cube.position.z * cube.position.z
        );

        // When a floating cube hits center zone (approx radius 4.5)
        if (distToCenter < 4.5 && collisionCooldown === 0) {
          triggerScatter();
          collisionCooldown = 180; // Prevent consecutive trigger loop
          // Reflect cube back outwards
          cube.userData.vx = (cube.position.x / distToCenter) * 0.05;
          cube.userData.vy = (cube.position.y / distToCenter) * 0.05;
        }
      });

      // Mouse Parallax
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.05;
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
  }, [isScattered]);

  const letters = ['J', 'C', 'J'];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      {/* 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto cursor-crosshair" />

      {/* Center Interactive Letters: JCJ */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        <div
          onClick={triggerScatter}
          className="flex items-center gap-2 sm:gap-6 md:gap-10 pointer-events-auto cursor-pointer"
          title="클릭하거나 큐브를 부딪혀 글씨를 흩어보세요"
        >
          {letters.map((char, index) => {
            const transform = letterTransforms[index];
            return (
              <span
                key={index}
                style={{
                  transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px) rotateX(${transform.rotX}deg) rotateY(${transform.rotY}deg) rotateZ(${transform.rotZ}deg) scale(${transform.scale})`,
                  transition: isScattered
                    ? 'transform 0.4s cubic-bezier(0.15, 1, 0.3, 1)'
                    : 'transform 2.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className={`inline-block font-black text-7xl sm:text-8xl md:text-9xl tracking-tight text-white select-none ${
                  isScattered
                    ? 'text-neutral-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                    : 'drop-shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:text-neutral-200'
                }`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Minimal Monochrome Subtitle & State indicator */}
        <div className="mt-8 flex flex-col items-center text-center space-y-3 pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 border border-neutral-800 bg-neutral-950/80 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span>SPATIAL INTERACTION LAB • 3D PHYSICS</span>
          </div>

          {/* Interactive instruction / Scatter status indicator */}
          <div className="flex items-center gap-2">
            {isScattered ? (
              <span className="flex items-center gap-1.5 font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-700 px-3 py-1 rounded-md">
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>재배치 중: {scatterCountdown}초</span>
              </span>
            ) : (
              <button
                onClick={triggerScatter}
                className="font-mono text-xs text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 hover:decoration-white underline-offset-4"
              >
                [ 글씨를 클릭하거나 떠다니는 3D 큐브와 충돌시키세요 ]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Exploration Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-auto">
        <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
          Explore Team Information
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onExploreSection('about')}
            className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-800 bg-neutral-950/70 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            팀소개
          </button>
          <button
            onClick={() => onExploreSection('members')}
            className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-800 bg-neutral-950/70 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            팀원소개
          </button>
          <button
            onClick={() => onExploreSection('project_01')}
            className="text-xs font-mono px-3 py-1.5 rounded border border-neutral-800 bg-neutral-950/70 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
          >
            project_01
          </button>
        </div>
        <ArrowDown className="w-4 h-4 text-neutral-600 animate-bounce mt-1" />
      </div>
    </section>
  );
}
