import { Dispatch, SetStateAction } from 'react';
declare global {
  /** State Setter for React and React like components */
  interface Setter<T> extends Dispatch<SetStateAction<T>> {}
}
