import { ReactNode, useEffect, useState } from 'react';

import ProgressBarPI from '@/components/progressBar/ProgressBarPI';
import { Measurement } from '@/interface/concentrationInterface/std';
import { useAirContent } from 'src/hook/useAirContent';
import { useAirQuality } from 'src/hook/useAirQuality';

type Props = {
  name: Measurement;
  value?: number;
  content?: string;
  index?: number | undefined;
  unit?: string | undefined;
  progress?: number;
  children?: ReactNode;
};

const progressColor = ['#BBD0FF', '#B8C0FF', '#FFD6FF', '#E7C6FF', '#C8B6FF'];

const ProgressCard = ({
  name,
  value = 0,
  content = '',
  unit = '',
  progress = 0,
  children,
}: Props) => {
  const [airContent, setAirContent] = useAirContent(name);
  const [airQuality, setAirQuality] = useAirQuality(name);
  const [localProgress, setLocalProgress] = useState<number>(progress);

  const [hide, setHide] = useState<Boolean>(true);

  useEffect(() => {
    setAirQuality(name);
    setAirContent(name);
  }, [name, setAirContent, setAirQuality]);

  useEffect(() => {
    setLocalProgress((value / airQuality.veryBad) * 100);
  }, [value, airQuality]);
  if (name === undefined) {
    return (
      <div className="flex flex-col p-4 bg-white rounded w-[13.5625em] shadow-md m-4 hover:scale-110 hover: duration-300 h-max ">
        {/* title */}
        <p className="m-2 text-2xl text-logo font-NanumSquareRound max-w-[9.25em] flex flex-wrap">{`${name}`}</p>
        {/* content */}
        <p className={`m-2 text-xs font-NanumSquareRound text-logo`}>
          {content}
        </p>

        <ProgressBarPI
          className="self-end mt-6"
          label={`${value} ${unit !== undefined ? unit : ''}`}
          labelColor="text-selectedFont"
          size={135}
          progress={progress}
          indicatorColor={`${progressColor[Math.round(progress / 20) - 1]}`}
        />
      </div>
    );
  }
  return (
    <div className="z-50 flex flex-col flex-auto p-4 m-4 duration-300 bg-white rounded shadow-md hover:scale-110 hover: h-max animate-fade-in-down">
      {/* title */}
      <p className="flex flex-wrap items-center justify-between w-full text-2xl ma-2 justify- text-logo font-NanumSquareRound text-achromatic-300">
        {`${airContent.nameKR}`}{' '}
        <span
          className="material-icons-round text-achromatic-300"
          onClick={() => {
            setHide((state) => !state);
          }}
        >
          open_in_full
        </span>
      </p>
      {/* content */}
      <p className={`m-2 text-xs font-NanumSquareRound `}>
        {airContent.description}
      </p>
      <div className="flex flex-row items-center justify-center">
        <ProgressBarPI
          className="m-6 "
          label={`${value} ${airContent.unit}`}
          labelColor="text-selectedFont"
          size={135}
          progress={localProgress}
          indicatorColor={`${progressColor[Math.round(localProgress / 20)]}`}
        />
        <div className={`${hide ? 'opacity-0 h-0 w-0' : 'opacity-100'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export { ProgressCard };
