import { useRef, useEffect, useState } from "react";
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gt from '@/assets/3d/gt.glb';

export const InteractiveModel = ({...props }) => {
  const modelRef = useRef<Group>(null);
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(gt);
  
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;
  const [isRotating, setIsRotating] = useState(false);

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

  return (
    <a.group ref={modelRef} {...props}>
      {/* Map through your model's nodes */}
      {Object.entries(nodes).map(([key, node]: [string, any]) => (
        node.geometry && (
          <mesh
            key={key}
            geometry={node.geometry}
            material={materials[node.material?.name] || materials.default}
          />
        )
      ))}
    </a.group>
  );
};

