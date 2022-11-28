import { room_state } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initState: room_state[] =[] ;
const stageSlice = createSlice({
  name: 'subwayStation',
  initialState: initState,
  reducers: {
    setRoomState: (state, action: PayloadAction<room_state>) => {
      return [
        ...state,
        action.payload,
      ];
    },
  },
});

export const { setRoomState } = stageSlice.actions;
export default stageSlice.reducer;
