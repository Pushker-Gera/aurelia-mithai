"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows, RoundedBox } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import type { SceneProps } from "./scene";
function seeded(n: number) {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
}
function useGrain() {
  const texture = useMemo(() => {
    const size = 256,
      data = new Uint8Array(size * size * 4);
    for (let i = 0; i < size * size; i++) {
      const x = i % size,
        y = Math.floor(i / size);
      const v = Math.floor(
        128 +
          Math.sin(x * 0.41 + Math.sin(y * 0.16) * 3) * 38 +
          Math.sin(y * 0.32 + Math.sin(x * 0.11) * 4) * 35 +
          seeded(i) * 20,
      );
      data[i * 4] = v;
      data[i * 4 + 1] = v;
      data[i * 4 + 2] = v;
      data[i * 4 + 3] = 255;
    }
    const t = new THREE.DataTexture(data, size, size);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 3);
    t.needsUpdate = true;
    return t;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}
function Garnish({ rose = false }: { rose?: boolean }) {
  return (
    <group>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (seeded(i + 40) - 0.5) * 1.3,
            0.315 + seeded(i + 23) * 0.018,
            (seeded(i + 10) - 0.5) * 0.65,
          ]}
          rotation={[seeded(i) * 0.3, seeded(i + 2) * 6, seeded(i + 3) * 0.2]}
          scale={[0.07 + seeded(i + 7) * 0.03, 0.021, 0.04]}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={rose && i % 3 === 0 ? "#912946" : i % 2 === 0 ? "#7e862e" : "#c6b267"}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
function Katli({ pista = false, chocolate = false }: { pista?: boolean; chocolate?: boolean }) {
  const grain = useGrain();
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.45, 0);
    s.lineTo(0, -0.9);
    s.lineTo(1.45, 0);
    s.lineTo(0, 0.9);
    s.closePath();
    return s;
  }, []);
  const silver = useMemo(() => {
    const g = new THREE.PlaneGeometry(2, 2, 56, 56);
    const a = g.attributes.position;
    for (let i = 0; i < a.count; i++) {
      const u = a.getX(i),
        v = a.getY(i);
      a.setXYZ(
        i,
        (u + v) * 0.695,
        (v - u) * 0.426,
        Math.sin(u * 47 + Math.sin(v * 29)) * Math.cos(v * 42) * 0.005 + seeded(i) * 0.003,
      );
    }
    g.computeVertexNormals();
    return g;
  }, []);
  useEffect(() => () => silver.dispose(), [silver]);
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.22, 0]}
        scale={pista || chocolate ? [0.88, 1.2, 1] : [1, 1, 1]}
      >
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.46,
              bevelEnabled: true,
              bevelSize: 0.055,
              bevelThickness: 0.035,
              bevelSegments: 3,
              steps: 1,
            },
          ]}
        />
        <meshStandardMaterial
          color={chocolate ? "#472317" : pista ? "#8d9548" : "#e5c896"}
          roughness={0.89}
          bumpMap={grain}
          bumpScale={0.025}
        />
      </mesh>
      <mesh
        geometry={silver}
        position={[0, 0.292, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={pista || chocolate ? [0.88, 1.2, 1] : [1, 1, 1]}
        receiveShadow
      >
        <meshStandardMaterial
          color={chocolate ? "#c6a149" : "#efefeb"}
          metalness={0.96}
          roughness={0.38}
          bumpMap={grain}
          bumpScale={0.014}
        />
      </mesh>
      <Garnish />
    </group>
  );
}
function Ladoo({ peda = false }: { peda?: boolean }) {
  const grain = useGrain();
  const beads = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!beads.current) return;
    const o = new THREE.Object3D();
    for (let i = 0; i < 260; i++) {
      const y = 1 - (2 * (i + 0.5)) / 260;
      const radius = Math.sqrt(1 - y * y);
      const angle = i * 2.399963;
      const scale = 0.065 + seeded(i) * 0.035;
      o.position.set(Math.cos(angle) * radius * 0.88, y * 0.88, Math.sin(angle) * radius * 0.88);
      o.scale.setScalar(scale);
      o.updateMatrix();
      beads.current.setMatrixAt(i, o.matrix);
    }
    beads.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <group scale={peda ? [1, 0.55, 1] : [1, 1, 1]}>
      <mesh castShadow>
        <sphereGeometry args={[0.87, 48, 32]} />
        <meshStandardMaterial
          color={peda ? "#d79989" : "#dd7617"}
          roughness={0.76}
          bumpMap={grain}
          bumpScale={peda ? 0.045 : 0.085}
        />
      </mesh>
      {!peda && (
        <instancedMesh ref={beads} args={[undefined, undefined, 260]} castShadow>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#e58a24" roughness={0.62} />
        </instancedMesh>
      )}
      <group position={[0, 0.55, 0]}>
        <Garnish rose={peda} />
      </group>
    </group>
  );
}
function GiftBox({ openness = 0 }: { openness?: number }) {
  const grain = useGrain();
  return (
    <group scale={0.9}>
      <RoundedBox
        args={[3.7, 0.65, 2.6]}
        radius={0.04}
        position={[0, -0.15, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#382017" roughness={0.92} bumpMap={grain} bumpScale={0.016} />
      </RoundedBox>
      <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.52, 2.43]} />
        <meshStandardMaterial color="#b18c4c" metalness={0.5} roughness={0.5} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <group
          key={i}
          position={[((i % 3) - 1) * 1.11, 0.42, (Math.floor(i / 3) - 0.5) * 1.13]}
          scale={0.35}
        >
          {i % 3 === 0 ? <Katli pista={i > 2} /> : <Ladoo peda={i % 3 === 1} />}
        </group>
      ))}
      <group
        position={[0, 0.8 + openness * 1.9, -openness * 0.65]}
        rotation={[-openness * 0.4, 0, 0]}
      >
        <RoundedBox args={[3.82, 0.19, 2.72]} radius={0.025} castShadow>
          <meshStandardMaterial color="#2b1610" roughness={0.85} bumpMap={grain} bumpScale={0.02} />
        </RoundedBox>
        <mesh position={[0, 0.101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.43, 0.442, 64]} />
          <meshStandardMaterial color="#c9a565" metalness={0.75} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.52, 0.022]} />
          <meshStandardMaterial color="#c9a565" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
function Composition({ type, mode, progress, onReady }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    const p = progress?.current || 0;
    const y = mode === "signature" ? -0.45 + p * Math.PI * 1.4 : Math.sin(time * 0.15) * 0.18;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      y + state.pointer.x * 0.12,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.25 + state.pointer.y * 0.06 + (mode === "signature" ? p * 0.16 : 0),
      3,
      delta,
    );
    group.current.position.y = Math.sin(time * 0.65) * 0.08;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={3.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.04}
      />
      <group ref={group} rotation={[0.25, -0.35, -0.09]} scale={mode === "signature" ? 1.35 : 1.1}>
        {type === "box" ? (
          <AnimatedBox progress={progress} />
        ) : type === "ladoo" ? (
          <Ladoo />
        ) : type === "peda" ? (
          <Ladoo peda />
        ) : (
          <Katli pista={type === "pista"} chocolate={type === "chocolate"} />
        )}
      </group>
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.22}
        scale={10}
        blur={2.7}
        far={3}
        resolution={128}
        frames={1}
      />
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={4}
          position={[0, 5, -3]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[8, 3, 1]}
        />
        <Lightformer
          intensity={3}
          position={[-4, 2, 3]}
          rotation={[0, Math.PI / 3, 0]}
          scale={[3, 6, 1]}
        />
        <Lightformer
          intensity={2}
          color="#edc997"
          position={[4, 1, 1]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[3, 5, 1]}
        />
      </Environment>
    </>
  );
}
function AnimatedBox({ progress }: { progress?: SceneProps["progress"] }) {
  const lid = useRef<THREE.Group>(null);
  useFrame(() => {
    if (lid.current) {
      const p = progress?.current ?? 0.55;
      const child = lid.current.children[0]?.children.at(-1);
      if (child) {
        child.position.y = 0.8 + p * 1.7;
        child.position.z = -p * 0.65;
        child.rotation.x = -p * 0.4;
      }
    }
  });
  return (
    <group ref={lid}>
      <GiftBox openness={0.4} />
    </group>
  );
}
export default function SweetCanvas(props: SceneProps) {
  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 3.4, 6.6], fov: 37 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ touchAction: "pan-y" }}
      fallback={null}
    >
      <Composition {...props} />
    </Canvas>
  );
}
