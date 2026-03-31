import { useState } from "react";

export function useLocalState<T>(initial: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(initial);
  return [val, setVal];
}