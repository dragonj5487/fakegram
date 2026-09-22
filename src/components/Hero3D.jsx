import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);
  const [isScattered, setIsScattered] = useState(false);

  // Letter transforms for J, C, J
  const [letterTransforms, setLetterTransforms] = useState([
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1 },
  ]);

  const scatterTimeoutRef = useRef(null);

  // Trigger scatter only on mouse hover (onMouseEnter)
  const triggerScatter = () => {
    if (isScattered) return;
    setIsScattered(true);

    // Random explosive scatter vector for each of the 3 letters
    setLetterTransforms([
      {
        x: (Math.random() - 0.75) * 340,
        y: (Math.random() - 0.5) * 260,
        z: Math.random() * 260,
        rotX: (Math.random() - 0.5) * 150,
        rotY: (Math.random() - 0.5) * 220,
        rotZ: (Math.random() - 0.5) * 110,
        scale: 0.7 + Math.random() * 0.4,
      },
      {
        x: (Math.random() - 0.5) * 220,
        y: (Math.random() - 0.8) * 320,
        z: Math.random() * 280,
        rotX: (Math.random() - 0.5) * 220,
        rotY: (Math.random() - 0.5) * 180,
        rotZ: (Math.random() - 0.5) * 150,
        scale: 0.6 + Math.random() * 0.5,
      },
      {
        x: (Math.random() - 0.25) * 360,
        y: (Math.random() - 0.5) * 280,
        z: Math.random() * 250,
        rotX: (Math.random() - 0.5) * 180,
        rotY: (Math.random() - 0.5) * 200,
        rotZ: (Math.random() - 0.5) * 130,
        scale: 0.7 + Math.random() * 0.4,
      },
    ]);

    // 3 seconds return timer (returns smoothly to original position)
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

    // Floating 3D Cubes (drifting around smoothly)
    const cubes = [];
    const numCubes = 16;
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

    // Subtle mouse parallax
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

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cubes.forEach((cube) => {
        cube.position.x += cube.userData.vx;
        cube.position.y += cube.userData.vy;
        cube.position.z += cube.userData.vz;

        cube.rotation.x += cube.userData.rotVx;
        cube.rotation.y += cube.userData.rotVy;

        if (Math.abs(cube.position.x) > 18) cube.userData.vx *= -1;
        if (Math.abs(cube.position.y) > 11) cube.userData.vy *= -1;
        if (Math.abs(cube.position.z) > 9) cube.userData.vz *= -1;
      });

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
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden select-none">
      {/* 3D WebGL Background Canvas with floating cubes */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Center JCJ: Scatters on mouse hover (onMouseEnter) */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div
          onMouseEnter={triggerScatter}
          className="group flex items-center gap-3 sm:gap-7 md:gap-12 cursor-pointer p-8"
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
                className={`inline-block font-black text-8xl sm:text-9xl md:text-[12rem] tracking-tight text-white select-none transition-colors duration-300 ${
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

        {/* Minimal clean badge */}
        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] tracking-widest text-neutral-400 border border-neutral-800/80 bg-neutral-950/70 px-4 py-1.5 rounded-full backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>SPATIAL INTERACTION LAB</span>
        </div>
      </div>
    </div>
  );
}
