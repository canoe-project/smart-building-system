import { useState, useEffect } from 'react';

import { room } from '@prisma/client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


import { Logo } from '@/components/paragraph/Logo';
import { Symbol } from '@/components/paragraph/Symbol';
import { setRoom } from '@/store/roomReducer';
import { setRoomState } from '@/store/roomStateReducer';
import { RootState } from '@/store/store';

// interface Props {
//   children?: JSX.Element | JSX.Element[] | string | string[];
// }

const getRoomState = async () => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room/roomToState`)
    .then(({ data }) => {
      return data;
    });
  return result;
};

const LeftSidebar = () => {
  const [rooms, setRooms] = useState();
  const roomState = useSelector((state: RootState) => state.roomStateReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getRoomState().then((data)=>{

        setRooms(data)
    })
  }, []);
 

  return (
    <div className="w-3/12 p-2 my-4 overflow-scroll text-selectedFontont scrollbar-hide">
      <div className="flex flex-row flex-shrink-0 p-2">
        <Symbol />
        <Logo />
      </div>
      <div className="flex-col p-2 my-4 overflow-scroll text-selectedFontont scrollbar-hide">
        {rooms?.map((roomData, idx) => {

          console.log(roomData)
          return (
            <div key={`list-${idx} `} className={"flex flex-row  hover:shadow-md items-center justify-between p-4"} 
            >
              <div
                key={idx}
                className={`text-achromatic-300 text-2xl my-4 mx-1 p-2 `}
                
              >{`${roomData.room_name} 호실`}
              </div>
              <div className='text-2xl text-achromatic-300'>{`${roomData.room_room_state[0].room_state.pir} PIR`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { LeftSidebar };
