import { Dispatch, SetStateAction, Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@/components/_shared";
import { BirdModel, IslandModel, PlaneModel, SkyModel } from "@/models";
import { adjustIslandForScreenSize, adjustPlaneForScreenSize } from "@/utils";

interface HeroProps {
  setCurrentStage: Dispatch<SetStateAction<number>>;
}

export const Hero = ({ setCurrentStage }: HeroProps) => {
  const [isRotating, setIsRotating] = useState(false);

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <Canvas
      className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
      camera={{ near: 0.1, far: 1000 }}
    >
      <Suspense fallback={<Loader />}>
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 5, 10]} intensity={2} />
        <spotLight
          position={[0, 50, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
        />
        <hemisphereLight groundColor="#000000" intensity={1} />

        <BirdModel />
        <SkyModel isRotating={isRotating} />
        <IslandModel
          setCurrentStage={setCurrentStage}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          position={islandPosition}
          scale={islandScale}
          rotation={[0.1, 4.7077, 0]}
        />x
        <PlaneModel
          isRotating={isRotating}
          position={planePosition}
          scale={planeScale}
          rotation={[0, 20.1, 0]}
        />
      </Suspense>
    </Canvas>
  );
};



// import { Canvas } from "@react-three/fiber";
// import { Suspense, useState } from "react";
// import { ComputerModel } from "@/models/ComputerModel";
// import { Loader } from "@/components/_shared";

// export const Hero = () => {
//   const [isRotating, setIsRotating] = useState(false);

//   return (
//     <section className="w-full h-screen relative" style={{
//       background: 'linear-gradient(135deg, #20B2AA 0%, #008B8B 100%)'
//     }}>
//       {/* 3D Canvas */}
//       <Canvas
//         className={`w-full h-full ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
//         camera={{
//           position: [0, 0, 15],  // Move camera much further back
//           fov: 45,               // Reduce field of view for better perspective
//           near: 0.1,
//           far: 1000
//         }}
//       >
//         <Suspense fallback={<Loader />}>
//          {/* Multiple light sources for better detail */}
//   <ambientLight intensity={0.3} />
  
//   {/* Main directional light */}
//   <directionalLight 
//     position={[10, 10, 10]} 
//     intensity={1.2} 
//     castShadow
//     shadow-mapSize={2048}
//   />
  
//   {/* Fill light */}
//   <directionalLight 
//     position={[-5, 5, 5]} 
//     intensity={0.6} 
//     color="#ffffff"
//   />
  
//   {/* Back light for rim lighting */}
//   <directionalLight 
//     position={[0, 5, -10]} 
//     intensity={0.4} 
//     color="#87CEEB"
//   />
  
//   {/* Screen glow */}
//   <pointLight position={[0, 0, 2]} intensity={1} color="#00CED1" />
  
//   <ComputerModel
//     position={[0, -3, -8]}   // Further back
//     scale={[4, 4, 4]}        // Larger scale
//     rotation={[0.1, 0, 0]}   // Slight tilt
//   />
//         </Suspense>
//       </Canvas>
//     </section>
//   );
// };