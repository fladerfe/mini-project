import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { type User } from '@thread-js/shared';

import { DataStatus } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { getCurrentUser, signIn, signUp } from './actions.js';

type State = {
  dataStatus: ValueOf<typeof DataStatus>;
  error: null | string;
  user: null | User;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  error: null,
  user: null
};

const { actions, reducer } = createSlice({
  extraReducers(builder) {
    builder
      .addMatcher(
        isAnyOf(signUp.pending, signIn.pending, getCurrentUser.pending),
        state => {
          state.dataStatus = DataStatus.PENDING;
          state.error = null;
        }
      )
      .addMatcher(isAnyOf(signUp.fulfilled), (state, action) => {
        state.user = action.payload.user;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addMatcher(isAnyOf(signIn.fulfilled), (state, action) => {
        state.user = action.payload.user;
        state.dataStatus = DataStatus.FULFILLED;
        state.error = null;
      })
      .addMatcher(isAnyOf(getCurrentUser.fulfilled), (state, action) => {
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(isAnyOf(getCurrentUser.rejected), state => {
        state.user = null;
        state.dataStatus = DataStatus.REJECTED;
      })
      .addMatcher(
        isAnyOf(signUp.rejected, signIn.rejected),
        (state, action) => {
          state.user = null;
          state.dataStatus = DataStatus.REJECTED;
          state.error = action.error.message ?? 'Authentication failed';
        }
      );
  },
  initialState,
  name: 'auth',
  reducers: {}
});

export { actions, reducer };
