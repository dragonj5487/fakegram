import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Hero3D() {
  const mountRef = useRef(null);
  const [isScattered, setIsScattered] = useState(false);

  // Letter transforms for J, C, J with scale & opacity for vanishing/reappearing effect
  const [letterTransforms, setLetterTransforms] = useState([
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
    { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
  ]);

  const isScatteredRef = useRef(false);
  const scatterTimeoutRef = useRef(null);

  // Trigger scatter: only invoked when a dragged cube approaches JCJ
  const triggerScatter = () => {
    if (isScatteredRef.current) return;
    isScatteredRef.current = true;
    setIsScattered(true);

    // Vanish into distant space: scale: 0, opacity: 0
    setLetterTransforms([
      {
        x: (Math.random() - 0.75) * 450,
        y: (Math.random() - 0.5) * 350,
        z: -650 - Math.random() * 400,
        rotX: (Math.random() - 0.5) * 240,
        rotY: (Math.random() - 0.5) * 300,
        rotZ: (Math.random() - 0.5) * 180,
        scale: 0.05,
        opacity: 0,
      },
      {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.8) * 450,
        z: -750 - Math.random() * 400,
        rotX: (Math.random() - 0.5) * 300,
        rotY: (Math.random() - 0.5) * 250,
        rotZ: (Math.random() - 0.5) * 220,
        scale: 0.05,
        opacity: 0,
      },
      {
        x: (Math.random() - 0.25) * 450,
        y: (Math.random() - 0.5) * 350,
        z: -650 - Math.random() * 400,
        rotX: (Math.random() - 0.5) * 260,
        rotY: (Math.random() - 0.5) * 280,
        rotZ: (Math.random() - 0.5) * 200,
        scale: 0.05,
        opacity: 0,
      },
    ]);

    // 3 seconds return timer
    if (scatterTimeoutRef.current) clearTimeout(scatterTimeoutRef.current);
    scatterTimeoutRef.current = setTimeout(() => {
      setLetterTransforms([
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
        { x: 0, y: 0, z: 0, rotX: 0, rotY: 0, rotZ: 0, scale: 1, opacity: 1 },
      ]);
      setIsScattered(false);
      isScatteredRef.current = false;
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2.2, 60);
    pointLight.position.set(12, 16, 16);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x777777, 1.4, 60);
    pointLight2.position.set(-16, -12, 12);
    scene.add(pointLight2);

    // Floating 3D Cubes - ONLY White Wireframe Cubes (Black cubes deleted)
    const cubes = [];
    const numCubes = 18;
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    for (let i = 0; i < numCubes; i++) {
      const size = 1.2 + Math.random() * 1.6;
      const geometry = new THREE.BoxGeometry(size, size, size);

      // White wireframe material for all cubes
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.35 + Math.random() * 0.45,
      });

      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 19,
        (Math.random() - 0.5) * 12
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

    // Raycaster & Mouse Dragging for Cubes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const dragPlane = new THREE.Plane();
    const planeIntersect = new THREE.Vector3();

    let draggedCube = null;
    let prevMousePos = new THREE.Vector3();
    let isDraggingCube = false;

    const getMouseNDC = (e) => {
      const rect = mount.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const onPointerDown = (e) => {
      if (e.button !== 0) return;
      const ndc = getMouseNDC(e);
      mouse.x = ndc.x;
      mouse.y = ndc.y;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubes);

      if (intersects.length > 0) {
        draggedCube = intersects[0].object;
        isDraggingCube = true;

        dragPlane.setFromNormalAndCoplanarPoint(
          camera.getWorldDirection(new THREE.Vector3()).negate(),
          draggedCube.position
        );

        prevMousePos.copy(intersects[0].point);
        mount.style.cursor = 'grabbing';
      }
    };

    const onPointerMove = (e) => {
      const ndc = getMouseNDC(e);
      mouse.x = ndc.x;
      mouse.y = ndc.y;

      if (isDraggingCube && draggedCube) {
        raycaster.setFromCamera(mouse, camera);
        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
          const deltaX = planeIntersect.x - prevMousePos.x;
          const deltaY = planeIntersect.y - prevMousePos.y;
          const deltaZ = planeIntersect.z - prevMousePos.z;

          draggedCube.position.copy(planeIntersect);
          draggedCube.userData.vx = deltaX * 0.4;
          draggedCube.userData.vy = deltaY * 0.4;
          draggedCube.userData.vz = deltaZ * 0.4;

          draggedCube.userData.rotVx = deltaY * 0.2;
          draggedCube.userData.rotVy = deltaX * 0.2;

          prevMousePos.copy(planeIntersect);

          // Trigger scatter ONLY when a dragged cube is brought near JCJ
          const distToCenter = Math.sqrt(
            draggedCube.position.x * draggedCube.position.x +
            draggedCube.position.y * draggedCube.position.y
          );
          if (distToCenter < 6.8) {
            triggerScatter();
          }
        }
      } else {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(cubes);
        mount.style.cursor = hits.length > 0 ? 'grab' : 'default';
      }
    };

    const onPointerUp = () => {
      if (isDraggingCube) {
        isDraggingCube = false;
        draggedCube = null;
        mount.style.cursor = 'default';
      }
    };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

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
        if (cube !== draggedCube) {
          cube.position.x += cube.userData.vx;
          cube.position.y += cube.userData.vy;
          cube.position.z += cube.userData.vz;

          cube.rotation.x += cube.userData.rotVx;
          cube.rotation.y += cube.userData.rotVy;

          if (Math.abs(cube.position.x) > 18) cube.userData.vx *= -1;
          if (Math.abs(cube.position.y) > 11) cube.userData.vy *= -1;
          if (Math.abs(cube.position.z) > 9) cube.userData.vz *= -1;
        }
      });

      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 1.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
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
      {/* 3D WebGL Background Canvas with draggable floating wireframe cubes */}
      <div ref={mountRef} className="absolute inset-0 z-0 touch-none" />

      {/* Center JCJ: Clean and standalone, badge completely removed */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="group flex items-center gap-3 sm:gap-7 md:gap-12 p-8">
          {letters.map((char, index) => {
            const transform = letterTransforms[index];
            return (
              <span
                key={index}
                style={{
                  transform: `translate3d(${transform.x}px, ${transform.y}px, ${transform.z}px) rotateX(${transform.rotX}deg) rotateY(${transform.rotY}deg) rotateZ(${transform.rotZ}deg) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  transition: isScattered
                    ? 'transform 0.85s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.75s ease-out'
                    : 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-in',
                }}
                className="inline-block font-black text-8xl sm:text-9xl md:text-[12rem] tracking-tight text-white select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.35)]"
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
