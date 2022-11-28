import { useState, useEffect } from 'react';

import { room } from '@prisma/client';
import axios from 'axios';

import { Logo } from '@/components/paragraph/Logo';
import { Symbol } from '@/components/paragraph/Symbol';

// interface Props {
//   children?: JSX.Element | JSX.Element[] | string | string[];
// }

const getRoom = async () => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room`)
    .then(({ data }) => {
      return data;
    });
  return result;
};

const LeftSidebar = () => {
  const [rooms, setRooms] = useState<room[]>();
  useEffect(() => {
    getRoom().then((roomData) => {
      setRooms(roomData);
    });
  }, []);

  return (
    <div className="w-3/12 p-2 my-4 overflow-scroll text-selectedFontont scrollbar-hide">
      <div className="flex flex-row flex-shrink-0 p-2">
        <Symbol />
        <Logo />
      </div>
      <div className="flex-col p-2 my-4 overflow-scroll text-selectedFontont scrollbar-hide">
        {rooms?.map((roomData, idx) => {
          return (
            <div
              key={idx}
              className={`text-achromatic-300 text-lg my-4 mx-1`}
            >{`${roomData.room_name}`}</div>
          );
        })}
      </div>
    </div>
  );
};

export { LeftSidebar };
