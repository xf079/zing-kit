import { useRef } from 'react';

function useLatest<T extends any>(value: T) {
  const ref = useRef(value);
  ref.current = value;

  return ref;
}

export default useLatest;
