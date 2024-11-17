import { useRef } from "react";

const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): {
  debouncedCallback: (...args: Parameters<T>) => void;
  flush: () => void;
} => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const argsRef = useRef<Parameters<T> | null>(null);

  const debouncedCallback = (...args: Parameters<T>) => {
    argsRef.current = args;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      callback(...(argsRef.current as Parameters<T>));
    }, delay);
  };

  const flush = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      callback(...(argsRef.current as Parameters<T>));
    }
  };

  return { debouncedCallback, flush };
};

export default useDebounce;
