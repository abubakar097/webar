import React from "react";
import { DefaultXRControllers, ARCanvas, useHitTest } from "@react-three/xr";
import { Box } from "@react-three/drei";

function HitTestExample() {
  const ref = React.useRef();

  useHitTest((hit) => {
    hit.decompose(
      ref.current.position,
      ref.current.rotation,
      ref.current.scale
    );
  });

  return <Box ref={ref} args={[3, 4, 0.5]} />;
}

export default function App() {
  return (
    <ARCanvas
      sessionInit={{ requiredFeatures: ["hit-test"] }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <HitTestExample />
      <DefaultXRControllers />
    </ARCanvas>
  );
}
