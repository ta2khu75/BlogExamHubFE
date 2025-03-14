import { AuthReducer } from '@/redux/slice/authSlide';
import { ExamAnswerReducer } from '@/redux/slice/examAnswerSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  examAnswer: ExamAnswerReducer
});
// export const makeStore = () => {
//   return store
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch