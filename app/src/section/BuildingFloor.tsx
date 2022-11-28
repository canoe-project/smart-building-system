import { useEffect, useState } from 'react';

import { room } from '@prisma/client';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import axios from 'axios';
import { Vector3 } from 'three';

import Room from '@/components/mesh/room/Room';

const getRoom = async () => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room`)
    .then(({ data }) => {
      return data;
    });
  return result;
};
const BuildingFloor = () => {
  // const cameraControls = useRef<CameraControls | null>(null);

  const [rooms, setRooms] = useState<room[]>();
  useEffect(() => {
    getRoom().then((roomData) => {
      setRooms(roomData);
    });
  }, []);
  // useEffect(()=>{
  //   cameraControls.current?.rotate(DEG45, 0, true);
  // },[])

  return (
    <Canvas
      camera={{
        position: [5, 5, 0],
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      <group rotation={[Math.PI * 0.5, 0, -Math.PI * 0.5]}>
        {rooms?.map((roomData, idx) => {
          return (
            <Room
              roomData={roomData}
              position={
                new Vector3(2 * Math.trunc(idx / 5), 2 * Math.trunc(idx % 5), 0)
              }
              key={`room-model-${idx}`}
            ></Room>
          );
        })}
        {/* <Room></Room>
        <Room position={new Vector3(1, 3, 1)}></Room>
        <Room position={new Vector3(3, 3, 1)}></Room> */}
      </group>
    </Canvas>
  );
};

export { BuildingFloor };
