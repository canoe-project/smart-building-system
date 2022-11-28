import React, { useState, useEffect } from 'react';

import { room_state } from '@prisma/client';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';

import {
  Iconcentration,
  Measurement,
} from '@/interface/concentrationInterface/std';
import { RootState } from '@/store/store';
import { useAirContent } from 'src/hook/useAirContent';

import { ProgressCard } from '../card/ProgressCard';

const getData = async (roomName: string) => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room_state?roomName=${roomName}`)
    .then(({ data }) => {
      return data;
    });
  return result;
};

interface Props {
  dataType: Measurement;
  roomNumber: string;
  stdValue?: Iconcentration;
  playHandle?: boolean;
  lineColor?: string;
  title?: string;
  max?: number;
}

const ChartSection = ({
  dataType = 'co2',
  roomNumber = '442',
  stdValue,
  title,
  max,
}: Props) => {
  const stateMax = useSelector((state: RootState) => state.stateMaxReducer);

  const [data, setData] = useState([]);
  const [delay] = useState<number>(10000);
  // ON/OFF
  const [isPlaying] = useState<boolean>(true);
  const [airContent] = useAirContent(dataType);

  useInterval(
    () => {
      // Your custom logic here
      getData(roomNumber).then((state: room_state) => {
        setData((prevState) => {
          if (state.created_date !== null) {
            return prevState.length === 10
              ? [
                  ...prevState.slice(1),
                  [new Date(state.created_date), state?.[dataType]],
                ]
              : [
                  ...prevState,
                  [new Date(state.created_date), state?.[dataType]],
                ];
          }
          return prevState;
        });
      });
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null
  );
  useEffect(() => {
    getData(roomNumber).then((state: room_state) => {
      setData((prevState) => {
        if (state.created_date !== null) {
          return prevState.length === 10
            ? [
                ...prevState.slice(1),
                [new Date(state.created_date), state?.[dataType]],
              ]
            : [...prevState, [new Date(state.created_date), state?.[dataType]]];
        }
        return prevState;
      });
    });
  }, []);

  const series = [
    {
      name: dataType,
      data: data.slice(),
    },
  ];
  const options = {
    ...(stdValue !== undefined &&
      !Array.isArray(stdValue) && {
        annotations: {
          yaxis: [
            {
              y: stdValue.good,
              y2: 0,
              borderColor: '#1982c4',
              fillColor: '#1982c4',
            },
            {
              y: stdValue.average,
              y2: stdValue.good,
              borderColor: '#8ac926',
              fillColor: '#8ac926',
            },
            {
              y: stdValue.bad,
              y2: stdValue.average,
              borderColor: '#ffca3a',
              fillColor: '#ffca3a',
            },
            {
              y: stdValue.veryBad,
              y2: stdValue.bad,
              borderColor: '#ff595e',
              fillColor: '#ff595e',
            },
          ],
        },
      }),
    chart: {
      id: 'realtime',
      height: 350,
      type: 'area',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: title === undefined ? 'Dynamic Updating Chart' : airContent.unit,
      align: 'left',
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'mm:ss',
      },
    },

    yaxis: {
      max:
        stateMax?.[`${dataType}`] === undefined
          ? 5000
          : stateMax?.[`${dataType}`],
      min: 0,
    },
  };

  return (
    <>
      <div id="chart" className="flex flex-col w-auto m-8 ">
        <ProgressCard
          name={dataType}
          value={data.slice(-1)[0] === undefined ? 0 : data.slice(-1)[0][1]}
          progress={data.slice(-1)[0] === undefined ? 0 : data.slice(-1)[0][1]}
        >
          <div className="flex flex-row items-center justify-center w-full h-4">
            <span className="bg-[#1982c4] w-2 h-2 mx-4"></span>
            <p className="font-bold text-achromatic-300 font-NanumSquareRound">
              good
            </p>
            <span className="bg-[#8ac926] w-2 h-2 mx-4"></span>
            <p className="font-bold text-achromatic-300 font-NanumSquareRound">
              average
            </p>
            <span className="bg-[#ffca3a] w-2 h-2 mx-4"></span>
            <p className="font-bold text-achromatic-300 font-NanumSquareRound">
              Bad
            </p>
            <span className="bg-[#ff595e] w-2 h-2 mx-4"></span>
            <p className="font-bold text-achromatic-300 font-NanumSquareRound">
              veryBad
            </p>
          </div>
          <Chart
            // @ts-ignore
            options={options}
            series={series}
            type="line"
            height={250}
            width={800}
          />
        </ProgressCard>
      </div>
    </>
  );
};

export default ChartSection;
