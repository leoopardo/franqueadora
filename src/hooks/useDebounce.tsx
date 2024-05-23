import { useEffect, useRef } from "react";

function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  function debouncedFunction(...args: any[]) {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }

  return debouncedFunction;
}

export default useDebounce;
