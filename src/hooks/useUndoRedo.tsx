import { useState, useEffect } from 'react';

export interface UndoRedoState<T> {
  value: T;
  history: T[];
  future: T[];
}

export const useUndoRedo = <T, >(initialValue: T, key: string) => {
  const [state, setState] = useState<UndoRedoState<T>>(() => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key);
      return savedValue
        ? { value: JSON.parse(savedValue), history: [], future: [] }
        : { value: initialValue, history: [], future: [] };
    } else {
      return { value: initialValue, history: [], future: [] };
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state.value));
    }
  }, [key, state.value]);

  const setValue = (newValue: T) => {
    setState((prev) => ({
      value: newValue,
      history: [...prev.history, prev.value],
      future: [],
    }));
  };

  const undo = () => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;
      const previousValue = prev.history[prev.history.length - 1];
      return {
        value: previousValue,
        history: prev.history.slice(0, -1),
        future: [prev.value, ...prev.future],
      };
    });
  };

  const redo = () => {
    setState((prev) => {
      if (prev.future.length === 0) return prev;
      const nextValue = prev.future[0];
      return {
        value: nextValue,
        history: [...prev.history, prev.value],
        future: prev.future.slice(1),
      };
    });
  };

  return { value: state.value, setValue, undo, redo };
};
