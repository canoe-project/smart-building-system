import { useRef, useState } from 'react';

import { room } from '@prisma/client';
import { Text } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
// import myFont from '../../../asset/font/NanumSquareRoundR.ttf';

import { setRoom } from '@/store/roomReducer';

interface Props {
  position?: THREE.Vector3 | undefined;
  roomData?: room;
}

const Room = ({ position, roomData }: Props) => {
  // const font = new FontLoader().parse(myFont);
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  // eslint-disable-next-line no-return-assign
  // useFrame((_state, _delta) => (ref.current.rotation.x += 0.01));

  const dispatch = useDispatch();

  return (
    <mesh
      ref={ref}
      position={position === undefined ? [1, 1, 1] : position}
      onClick={(_event) => {
        click(!clicked);
        if (roomData) {
          dispatch(setRoom(roomData));
        }
      }}
      onPointerOver={(_event) => hover(true)}
      onPointerOut={(_event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <Text
        scale={[2, 2, 1]}
        position={[0, 0.6, 0]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        color="#323b4c" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {`${roomData?.room_name}`}
      </Text>
      <meshStandardMaterial color={hovered ? '#b8c0ff' : '#f9faf5'} />
    </mesh>
  );
};

export default Room;
