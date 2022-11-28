// import { }, useState } from 'react';
import { useEffect, useState } from 'react';

import ProgressBarPI from '@/components/progressBar/ProgressBarPI';
import {
  AirAtomics,
  AirQualityValue,
} from 'interface/apiInterface/airQualityInterface';
import { useAirContent } from 'src/hook/useAirContent';
import { useAirQuality } from 'src/hook/useAirQuality';

type Props = {
  name: AirAtomics | AirQualityValue;
  value?: number;
  content?: string;
  index?: number | undefined;
  unit?: string | undefined;
  progress?: number;
};

const progressColor = ['#BBD0FF', '#B8C0FF', '#FFD6FF', '#E7C6FF', '#C8B6FF'];

const ProgressCard = ({
  name,
  value = 0,
  content = '',
  unit = '',
  progress = 0,
}: Props) => {
  const [airContent, setAirContent] = useAirContent(name);
  const [airQuality, setAirQuality] = useAirQuality(name);
  const [localProgress, setLocalProgress] = useState<number>(progress);

  useEffect(() => {
    setAirQuality(name);
    setAirContent(name);
  }, [name, setAirContent, setAirQuality]);

  useEffect(() => {
    setLocalProgress((value / airQuality.veryBad.BPHI) * 100);
  }, [value, airQuality]);
  if (name === undefined) {
    return (
      <div className="absolute z-50 flex flex-col p-4 bg-white rounded w-[13.5625em] shadow-md m-4 hover:scale-110 hover: duration-300 h-max ">
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
    <div className="absolute z-50 flex flex-col p-4 bg-white rounded w-[13.5625em] shadow-md m-4 hover:scale-110 hover: duration-300 h-max animate-fade-in-down ">
      {/* title */}
      <p className="m-2 text-2xl text-logo font-NanumSquareRound max-w-[9.25em] flex flex-wrap">{`${airContent.nameKR}`}</p>
      {/* content */}
      <p className={`m-2 text-xs font-NanumSquareRound text-logo`}>
        {airContent.description}
      </p>

      <ProgressBarPI
        className="self-end mt-6"
        label={`${value} ${airContent.unit}`}
        labelColor="text-selectedFont"
        size={135}
        progress={localProgress}
        indicatorColor={`${progressColor[Math.round(localProgress / 20)]}`}
      />
    </div>
  );
};

export { ProgressCard };
