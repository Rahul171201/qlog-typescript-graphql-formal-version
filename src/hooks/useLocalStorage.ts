import { Dispatch, SetStateAction } from 'react';

const { useState, useEffect } = require('react');

const useLocalStorage = <T>(
  key: string,
  initialValue: Map<number, T>
): [Map<number, T>, Dispatch<SetStateAction<Map<number, T>>>] => {
  const [value, setValue]: [
    Map<number, T>,
    Dispatch<SetStateAction<Map<number, T>>>
  ] = useState((): Map<number, T> => {
    if (typeof window === 'undefined') {
      return initialValue;
    } else {
      const item = window.localStorage.getItem(key) as string;
      if (item) {
        return new Map(JSON.parse(item));
      } else return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(
      key,
      JSON.stringify(Array.from(value.entries()))
    );
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
