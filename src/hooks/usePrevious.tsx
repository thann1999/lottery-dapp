import { useEffect, useRef } from 'react';

export default function usePrevious<T>(value: T, defaultValue?: T) {
  const ref = useRef(defaultValue);

  useEffect(() => {
    ref.current = value; // assign the value of ref to the argument
  }, [value]); // this code will run when the value of 'value' changes

  return ref.current; // in the end, return the current ref value.
}
