import { useState, useEffect } from 'react';

import airAualityDataSet from '@/assets/data/air-quality/airAualityDataSet.json';
import {
  IAirContents,
  Measurement,
} from '@/interface/concentrationInterface/std';

const useAirContent = (
  atomic: Measurement
): [IAirContents, (atomic: Measurement) => void] => {
  const [pickAtomic, setPickAtomic] = useState<IAirContents>(
    airAualityDataSet.co2
  );

  useEffect(() => {
    if (atomic !== undefined) {
      setPickAtomic(airAualityDataSet[atomic]);
    }
  }, [atomic]);

  const setValue = (value: Measurement) => {
    try {
      setPickAtomic(airAualityDataSet[value]);
    } catch (error) {
      console.log(error);
    }
  };
  return [pickAtomic, setValue];
};

export { useAirContent };
