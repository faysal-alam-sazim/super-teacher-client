import { createSlice } from "@reduxjs/toolkit";

interface IRegistrationAttemptCount {
  counter: number;
}

const initialState: IRegistrationAttemptCount = {
  counter: 3,
};

export const attemptCounterSlice = createSlice({
  name: "attempCounter",
  initialState,
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },

    resetCounter: (state) => {
      state.counter = 3;
    },
  },
});

export const { setCounter, resetCounter } = attemptCounterSlice.actions;

export default attemptCounterSlice.reducer;
