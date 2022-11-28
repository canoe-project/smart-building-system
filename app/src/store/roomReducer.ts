import { room } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initState: room = {
  id: 0,
  created_date: null,
  description: null,
  modified_date: null,
  room_name: null,
  building_id: null,
};

const stageSlice = createSlice({
  name: 'subwayStation',
  initialState: initState,
  reducers: {
    setRoom: (state, action: PayloadAction<room>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRoom } = stageSlice.actions;
export default stageSlice.reducer;
