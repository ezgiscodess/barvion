import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ProductCanvasProps = {
  accent: string;
  reduceMotion: boolean;
};

function SensorProduct({ accent, reduceMotion }: ProductCanvasProps) {
  const product = useRef<THREE.Group>(null);
  const glow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    if (!product.current || reduceMotion) return;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.2 - 0.24;
    product.current.rotation.x = THREE.MathUtils.damp(product.current.rotation.x, targetX, 4, delta);
    product.current.rotation.y = THREE.MathUtils.damp(product.current.rotation.y, targetY, 4, delta);
    product.current.position.y = THREE.MathUtils.damp(
      product.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.7) * 0.035,
      3,
      delta,
    );
    if (glow.current) {
      glow.current.emissiveIntensity = 2.4 + Math.sin(state.clock.elapsedTime * 1.8) * 0.35;
    }
  });

  const posts: [number, number, number][] = [
    [-1.18, 0.05, -0.88],
    [1.18, 0.05, -0.88],
    [-1.18, 0.05, 0.88],
    [1.18, 0.05, 0.88],
  ];

  return (
    <group ref={product} rotation={[0.04, -0.24, 0]} position={[0.18, -0.12, 0]}>
      <RoundedBox args={[3.1, 0.28, 2.55]} radius={0.18} smoothness={5} position={[0, -1.24, 0]} castShadow>
        <meshStandardMaterial color="#171918" metalness={0.86} roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[2.72, 0.24, 2.18]} radius={0.16} smoothness={5} position={[0, -1.04, 0]} castShadow>
        <meshStandardMaterial color="#3d403d" metalness={0.96} roughness={0.22} />
      </RoundedBox>

      <mesh position={[0, -0.05, 0]} castShadow>
        <cylinderGeometry args={[1.22, 1.22, 1.88, 64]} />
        <meshPhysicalMaterial
          color="#211b17"
          metalness={0.1}
          roughness={0.16}
          transmission={0.72}
          thickness={0.35}
          transparent
          opacity={0.76}
        />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 1.5, 48]} />
        <meshStandardMaterial color="#090a09" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.035, 12, 64]} />
        <meshStandardMaterial ref={glow} color={accent} emissive={accent} emissiveIntensity={2.4} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0.98, 0]} castShadow>
        <cylinderGeometry args={[1.37, 1.3, 0.3, 64]} />
        <meshStandardMaterial color="#424541" metalness={0.98} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.14, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.08, 64]} />
        <meshStandardMaterial color="#111311" metalness={0.8} roughness={0.24} />
      </mesh>

      {posts.map((position, index) => (
        <RoundedBox key={index} args={[0.18, 2.25, 0.18]} radius={0.07} smoothness={4} position={position} castShadow>
          <meshStandardMaterial color="#343734" metalness={0.96} roughness={0.23} />
        </RoundedBox>
      ))}

      {Array.from({ length: 9 }, (_, index) => {
        const angle = (index / 9) * Math.PI * 2;
        return (
          <mesh key={index} position={[Math.sin(angle) * 1.16, -0.84, Math.cos(angle) * 1.16]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.06, 0.24, 0.08]} />
            <meshStandardMaterial color="#080908" roughness={0.5} />
          </mesh>
        );
      })}

      <RoundedBox args={[0.58, 0.12, 0.045]} radius={0.05} smoothness={5} position={[0, -0.64, 1.235]}>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={3.1} toneMapped={false} />
      </RoundedBox>
    </group>
  );
}

export default function ProductCanvas({ accent, reduceMotion }: ProductCanvasProps) {
  return (
    <Canvas
      className="product-canvas"
      shadows
      dpr={[1, 1.5]}
      frameloop={reduceMotion ? "demand" : "always"}
      camera={{ position: [4.5, 2.55, 5.25], fov: 38, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
    >
      <ambientLight intensity={0.42} />
      <spotLight position={[4, 6, 3]} angle={0.38} penumbra={0.82} intensity={45} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 1.5, 2]} color="#9fb8ff" intensity={18} />
      <pointLight position={[2, -1, -3]} color={accent} intensity={12} />
      <SensorProduct accent={accent} reduceMotion={reduceMotion} />
      <ContactShadows position={[0, -1.42, 0]} opacity={0.62} scale={7} blur={2.7} far={4.5} resolution={256} />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 4, -4]} scale={[5, 1, 1]} />
        <Lightformer intensity={1.4} position={[-4, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[3, 1, 1]} />
      </Environment>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enabled={!reduceMotion}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 1.85}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
