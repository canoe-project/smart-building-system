import React, { useState, useEffect } from 'react';

import { room_state } from '@prisma/client';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { useInterval } from 'usehooks-ts';

import {
  Iconcentration,
  Measurement,
} from '@/interface/concentrationInterface/std';

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
  const [data, setData] = useState([]);
  const [delay, setDelay] = useState<number>(10000);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(true);
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
    console.log(data);
  }, [data]);

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
              borderColor: '#1982c4',
              label: {
                borderColor: '#1982c4',
                style: {
                  color: '#fff',
                  background: '#1982c4',
                },
                text: 'good',
              },
            },
            {
              y: stdValue.average,
              borderColor: '#8ac926',
              label: {
                borderColor: '#8ac926',
                style: {
                  color: '#fff',
                  background: '#8ac926',
                },
                text: 'average',
              },
            },
            {
              y: stdValue.bad,
              borderColor: '#ffca3a',
              label: {
                borderColor: '#ffca3a',
                style: {
                  color: '#fff',
                  background: '#ffca3a',
                },
                text: 'bad',
              },
            },
            {
              y: stdValue.veryBad,
              borderColor: '#ff595e',
              label: {
                borderColor: '#ff595e',
                style: {
                  color: '#fff',
                  background: '#ff595e',
                },
                text: 'veryBad',
              },
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
      text: title === undefined ? 'Dynamic Updating Chart' : title,
      align: 'left',
    },
    markers: {
      size: 4,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MM:ss',
      },
    },

    yaxis: {
      max: max === undefined ? 5000 : max,
      min: 0,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div id="chart" className="m-8 bg-white">
      <Chart
        // @ts-ignore
        options={options}
        series={series}
        type="line"
        height={350}
        width={500}
      />
    </div>
  );
};

export default ChartSection;
