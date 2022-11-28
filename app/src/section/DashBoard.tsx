import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

import { Iconcentration } from '@/interface/concentrationInterface/std';
import { RootState } from '@/store/store';

const Chart = dynamic(() => import('@/components/charts/Chart'), {
  ssr: false,
});

const DashBoard = () => {
  const roomState = useSelector((state: RootState) => state.roomReducer);

  const [hide, setHide] = useState<boolean>(true);

  useEffect(() => {
    if (roomState.room_name !== null) {
      setHide(false);
    }
  }, [roomState]);

  const [co2std] = useState<Iconcentration>({
    good: 450,
    average: 350,
    bad: 1000,
    veryBad: 2000,
  });
  const [humiditystd] = useState<Iconcentration>({
    good: 20,
    average: 40,
    bad: 60,
    veryBad: 80,
  });
  const [lightstd] = useState<Iconcentration>({
    good: 200,
    average: 400,
    bad: 600,
    veryBad: 800,
  });
  const [temperaturestd] = useState<Iconcentration>({
    good: 20,
    average: 30,
    bad: 100,
    veryBad: 500,
  });

  return (
    <div
      className={`absolute flex w-full h-full flex-col transition-opacity duration-700 ease-in-out ${
        hide ? 'opacity-0 -z-50 h-0' : 'opacity-100 z-50'
      } animate-[slideInLeft_1s_ease-in-out] bg-white overflow-auto overflow-x-hidden`}
    >
      <div className="flex flex-row items-center justify-between m-4">
        <h1 className="mt-4 ml-4 text-2xl font-bold font-NanumSquareRound text-achromatic-300">
          {`${roomState.room_name} 호실`}
        </h1>
        <span
          onClickCapture={() => {
            setHide((state) => !state);
          }}
          className="material-icons-round"
        >
          close
        </span>
      </div>
      <div className="flex flex-row flex-wrap w-full h-full">
        <Chart
          dataType="co2"
          roomNumber={
            roomState.room_name === null ? '442' : roomState.room_name
          }
          stdValue={co2std}
          max={5000}
          title="co2"
        ></Chart>
        <Chart
          dataType="humidity"
          roomNumber={
            roomState.room_name === null ? '442' : roomState.room_name
          }
          stdValue={humiditystd}
          max={100}
          title="humidity"
        ></Chart>
        <Chart
          dataType="light"
          roomNumber={
            roomState.room_name === null ? '442' : roomState.room_name
          }
          stdValue={lightstd}
          max={1000}
          title="light"
        ></Chart>
        <Chart
          dataType="pir"
          roomNumber={
            roomState.room_name === null ? '442' : roomState.room_name
          }
          title="pir"
          max={30}
        ></Chart>
        <Chart
          dataType="temperature"
          roomNumber={
            roomState.room_name === null ? '442' : roomState.room_name
          }
          stdValue={temperaturestd}
          title="temperature"
          max={500}
        ></Chart>
      </div>
    </div>
  );
};

export { DashBoard };
