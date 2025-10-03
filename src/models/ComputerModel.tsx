import { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { a } from '@react-spring/three';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import computer from '@/assets/3d/my_computer.glb';

interface ComputerModelProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: any;
}

export const ComputerModel = ({ ...props }: ComputerModelProps) => {
  const modelRef = useRef<Group>(null);
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(computer);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;
  const [isRotating, setIsRotating] = useState(false);

  // Create retro computer materials
  const computerBodyMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#E8E8E8', // Light gray/white for computer body
      metalness: 0.1,
      roughness: 0.8,
    }), []
  );

  const screenMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#000000', // Black for screen bezel
      metalness: 0.2,
      roughness: 0.9,
    }), []
  );

  const screenDisplayMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#00CED1', // Cyan/turquoise for screen content
      emissive: '#006666',
      emissiveIntensity: 0.3,
      metalness: 0,
      roughness: 0.1,
    }), []
  );

  const keyboardMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#F5F5F5', // Off-white for keyboard keys
      metalness: 0.1,
      roughness: 0.7,
    }), []
  );

  const darkPartsMaterial = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: '#2F2F2F', // Dark gray for accents
      metalness: 0.3,
      roughness: 0.6,
    }), []
  );

  // Your interaction logic...
  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;

      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.01 * Math.PI;
      }

      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, isRotating]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      if (modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed.current;
      }
    }
  });

  // Debug logs
  console.log('Computer Model loaded!');
  console.log('Nodes:', Object.keys(nodes));
  console.log('Materials:', Object.keys(materials));

  return (
    <a.group ref={modelRef} {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]: [string, any]) => {
        if (node.geometry) {
          // Choose material based on node/part name
          let material = computerBodyMaterial; // Default to computer body
          
          const nodeName = key.toLowerCase();
          
          if (nodeName.includes('screen') || nodeName.includes('display') || nodeName.includes('monitor')) {
            if (nodeName.includes('glass') || nodeName.includes('content')) {
              material = screenDisplayMaterial; // Glowing screen content
            } else {
              material = screenMaterial; // Screen bezel
            }
          } else if (nodeName.includes('keyboard') || nodeName.includes('key')) {
            material = keyboardMaterial;
          } else if (nodeName.includes('cable') || nodeName.includes('wire') || nodeName.includes('port')) {
            material = darkPartsMaterial;
          }

          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={material}
            />
          );
        }
        return null;
      })}
    </a.group>
  );
};

useGLTF.preload('@/assets/3d/my_computer.glb');