import {
  useState, useRef, Suspense,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from '../ThemeContext';
import Loader from './Loader';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(3200), { radius: 1.2 }));
  const { theme } = useTheme();
  const starColor = theme === 'dark' ? '#ffffff' : '#000000';

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={starColor}
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className="absolute left-0 top-0 z-[-1]">
    <Canvas
      camera={{ position: [0, 0, 1] }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100vw', height: '100vh' }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
      className="star-canvas"
    >
      <Suspense fallback={<Loader />}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvas;
