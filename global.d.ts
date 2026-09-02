import { Dispatch, SetStateAction } from 'react';
declare global {
  /**
   * State setter for React and React like components.
   *
   * A type alias rather than an empty interface extending one: an interface
   * that declares no members of its own is just its supertype under another
   * name, which typescript-eslint v8 rightly points out.
   */
  type Setter<T> = Dispatch<SetStateAction<T>>;
}
