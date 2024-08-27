import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TRootState } from "@/shared/redux/store";
import { ERole } from "@/shared/typedefs";

import { TTokenizedUser } from "../rtk-apis/auth/auth.types";

interface IAuthenticatedUser {
  userId: number | null;
  email: string | null;
  claim: ERole | null;
  userProfileId: number | null;
}

const initialState: IAuthenticatedUser = {
  userId: 1,
  email: null,
  claim: null,
  userProfileId: null,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TTokenizedUser>) => {
      state.email = action.payload.email;
      state.claim = action.payload.claim as ERole;
      state.userId = action.payload.id;
      state.userProfileId = action.payload.userProfileId;
    },

    clearUser: (state) => {
      state.email = null;
      state.claim = null;
      state.userId = null;
      state.userProfileId = null;
    },
  },
});

export const { setUser, clearUser } = authenticatedUserSlice.actions;

export const selectUserId = (state: TRootState) => state.authenticatedUser.userId;

export default authenticatedUserSlice.reducer;
