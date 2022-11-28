import { useState, useEffect } from 'react';

import airAualityValue from '@/assets/data/air-quality/airAualityValue.json';
import {
  Iconcentration,
  Measurement,
} from '@/interface/concentrationInterface/std';

const useAirQuality = (
  atomic: Measurement
): [Iconcentration, (atomic: Measurement) => void] => {
  const [pickAtomic, setPickAtomic] = useState<Iconcentration>(
    airAualityValue.co2
  );

  useEffect(() => {
    if (atomic !== undefined) {
      setPickAtomic(airAualityValue[atomic]);
    }
  }, [atomic]);

  const setValue = (value: Measurement) => {
    try {
      setPickAtomic(airAualityValue[value]);
    } catch (error) {
      console.log(error);
    }
  };

  return [pickAtomic, setValue];
};

export { useAirQuality };
