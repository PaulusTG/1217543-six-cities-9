import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: dataProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
});
