import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TDebouncedProps = {
  searchTerm: string;
  delay: number;
};

export const useDebounced = ({ searchTerm, delay }: TDebouncedProps) => {
  const [debounced, setDebounced] = useState<string>(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(searchTerm);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);
  return debounced;
};
