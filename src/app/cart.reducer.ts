import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './cart.actions';

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, () => 0)
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
