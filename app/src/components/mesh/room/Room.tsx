import { useRef, useState } from 'react';

import { room } from '@prisma/client';
import { Text } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import * as THREE from 'three';
// import myFont from '../../../asset/font/NanumSquareRoundR.ttf';

import { setRoom } from '@/store/roomReducer';
import {useEffect} from 'react';
import axios from 'axios';

interface Props {
  position?: THREE.Vector3 | undefined;
  roomData?: room;
}

const getData = async (roomName: string) => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room_state?roomName=${roomName}`)
    .then(({ data }) => {
      return data;
    });
  return result;
};

const Room = ({ position, roomData }: Props) => {
  // const font = new FontLoader().parse(myFont);
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [pir, setPIR] = useState<number>(0);
  // Rotate mesh every frame, this is outside of React without overhead
  // eslint-disable-next-line no-return-assign
  // useFrame((_state, _delta) => (ref.current.rotation.x += 0.01));

  useEffect(()=>{
    getData(roomData?.room_name).then((data)=>{
      setPIR(data.pir)
    })
  },[])

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
        position={[0, 0.8, 0.5]}
        rotation={[-Math.PI, 0, 0]}
        color="#323b4c" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        {`Room ${roomData?.room_name}`}
      </Text>
      <meshStandardMaterial color={hovered ? '#b8c0ff' : pir === 0 ? '#f9faf5' : "red"} />
    </mesh>
  );
};

export default Room;
