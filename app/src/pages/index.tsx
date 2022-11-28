import { useEffect } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';

import { Measurement } from '@/interface/concentrationInterface/std';
import { BuildingFloor } from '@/section/BuildingFloor';
import { DashBoard } from '@/section/DashBoard';
import { setRoomStateMax } from '@/store/stateMaxReducer';

const getData = async (stateName: Measurement) => {
  const result = await axios
    .get(`${process.env.HOSTNAME}/api/room_state/max?${stateName}=desc`)
    .then(({ data }) => {
      return data;
    });
  return result;
};
const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getData('co2').then((data) => {
      dispatch(setRoomStateMax(data));
    });
    getData('humidity').then((data) => {
      dispatch(setRoomStateMax(data));
    });
    getData('light').then((data) => {
      dispatch(setRoomStateMax(data));
    });
    getData('pir').then((data) => {
      dispatch(setRoomStateMax(data));
    });
    getData('temperature').then((data) => {
      dispatch(setRoomStateMax(data));
    });
  }, []);
  return (
    <div className="relative flex w-full h-full overflow-scroll scrollbar-hide">
      <DashBoard></DashBoard>
      <BuildingFloor></BuildingFloor>
    </div>
  );
};

export default Index;
