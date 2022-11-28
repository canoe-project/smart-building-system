import { room_state } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initState: room_state = {
  id: 0,
  co2: null,
  created_date: null,
  humidity: null,
  light: null,
  modified_date: null,
  pir: null,
  temperature: null,
  room_id: null,
};

const stageSlice = createSlice({
  name: 'subwayStation',
  initialState: initState,
  reducers: {
    setRoomStateMax: (state, action: PayloadAction<room_state>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRoomStateMax } = stageSlice.actions;
export default stageSlice.reducer;
