import { useRef, Suspense } from "react";

import { DefaultXRControllers, ARCanvas, useHitTest } from "@react-three/xr";
import { Box, OrbitControls, useTexture } from "@react-three/drei";

import { useRouter } from "next/router";

function HitTestExample({ image }) {
  const ref = useRef();
  const texture = useTexture(image);
  useHitTest((hit) => {
    hit.decompose(
      ref.current.position,
      ref.current.rotation,
      ref.current.scale
    );
  });

  return (
    <group>
      <Box ref={ref} args={[4, 4.5, 0.1]}>
        <meshStandardMaterial
          color="#966F33"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
      </Box>
      <Box ref={ref} args={[3.5, 4, 0.01]} position={[0, 0, 0.05]}>
        <meshBasicMaterial map={texture} />
      </Box>
    </group>
  );
}

export default function App() {
  const router = useRouter();
  const id = router.query.id;
  const imageRef = `https://fypaesthetics.s3.ap-south-1.amazonaws.com/${id}`;
  return (
    <Suspense fallback={"loading..."}>
      <ARCanvas
        sessionInit={{ requiredFeatures: ["hit-test"] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <HitTestExample image={imageRef} />
        <OrbitControls />
        <DefaultXRControllers />
      </ARCanvas>
    </Suspense>
  );
}
