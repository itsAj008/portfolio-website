import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Group } from 'three';
import { a } from '@react-spring/three';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gt from '@/assets/3d/gt.glb';

interface GtModelProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  [key: string]: any;
}

export const GtModel = ({ ...props }: GtModelProps) => {
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

  console.log('GT Model loaded!');
  console.log('Nodes:', Object.keys(nodes));
  console.log('Materials:', Object.keys(materials));

  return (
    <a.group ref={modelRef} {...props} dispose={null}>
      <mesh geometry={nodes.MSM_Brake_RR_0000_001_SM_Brake_RR_0000_MAT_Tire_Brake_003_MMAT_Tire_Brake1_0.geometry} material={materials.MMAT_Tire_Brake1} position={[-0.008, 0.002, -0.014]} rotation={[-Math.PI / 2, -1.557, -Math.PI / 2]} scale={0.013} />
      <mesh geometry={nodes.MSM_Disk_R_0000_001_SM_Disk_R_0000_MAT_Disk_001_MMAT_Disk1_0.geometry} material={materials.MMAT_Disk1} position={[-0.008, 0.002, -0.014]} rotation={[-Math.PI / 2, -1.557, -Math.PI / 2]} scale={0.013} />
      <mesh geometry={nodes.MSM_Hub_R_0000_001_SM_Hub_R_0000_MAT_Details_Hub_001_MMAT_Details_Hub1_0.geometry} material={materials.MMAT_Details_Hub1} position={[-0.008, 0.002, -0.014]} rotation={[-Math.PI / 2, -1.557, -Math.PI / 2]} scale={0.012} />
      <mesh geometry={nodes.MSM_Base_0000_001_SM_Base_0000_MAT_Mclaren_GT_Base_MMAT_Mclaren_GT_Base1_0.geometry} material={materials.MMAT_Mclaren_GT_Base1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_Base_0000_001_SM_Base_0000_MAT_Mclaren_GT_Base1_MMAT_Glass1_0.geometry} material={materials.MMAT_Glass1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_Base_0000_001_SM_Base_0000_MAT_Mclaren_GT_Base2_MMAT_Details_MAT1_0.geometry} material={materials.MMAT_Details_MAT1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_FrontKit_0000_001_SM_FrontKit_0000_MAT_Mclaren_GT_Base_003_MMAT_Lights1_0.geometry} material={materials.MMAT_Lights1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_FrontKit_0000_001_SM_FrontKit_0000_MAT_Mclaren_GT_Base_005_MMAT_Details_Grid_01_002_0.geometry} material={materials.MMAT_Details_Grid_01_002} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_FrontKit_0000_001_SM_FrontKit_0000_MAT_Mclaren_GT_Base_006_MMAT_Details_Chassis_0001_002_0.geometry} material={materials.MMAT_Details_Chassis_0001_002} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_Hood_0000_001_SM_Hood_0000_MAT_Mclaren_GT_Base_003_MMAT_Details_EXT1_0.geometry} material={materials.MMAT_Details_EXT1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_Interior_0000_001_SM_Interior_0000_MAT_Mclaren_GT_Base_004_MMAT_Details_INT1_0.geometry} material={materials.MMAT_Details_INT1} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.MSM_RearKit_0000_001_SM_RearKit_0000_MAT_Mclaren_GT_Base_011_MMAT_Details_Grid_04_0.geometry} material={materials.MMAT_Details_Grid_04} rotation={[0.019, -Math.PI / 2, 0]} scale={0.01} />
      <mesh geometry={nodes.wpolySurface133Combined3DWheel_3DWheel_Front_L_Instance1_Src4Combined_Wheels_3D_Wheel1A_3D_wheel_0.geometry} material={materials.wheel} position={[0, -0.001, 0.001]} scale={0.01} />
    </a.group>
  );
};

useGLTF.preload('/gt-transformed.glb');