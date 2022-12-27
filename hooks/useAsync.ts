import { useCallback, useEffect, useState } from "react";

export const useAsync = (func: Function, dependencies = []) => {
  const { execute, ...state } = useAsyncInternal(func, dependencies, true);

  useEffect(() => {
    execute();
  }, [execute]);

  return state;
};

export const useAsyncFn = (func: Function, dependencies = []) => {
  return useAsyncInternal(func, dependencies, false);
};

const useAsyncInternal = (func: Function, dependencies: string[], initialLoading = false) => {
  const [loading, setLoading] = useState<any>(initialLoading);
  const [error, setError] = useState<any>();
  const [value, setValue] = useState<any>();

  const execute = useCallback((...params: any) => {
    setLoading(true);
    return func(...params)
      .then((data: any) => {
        setValue(data);
        setError(undefined);
        return data;
      })
      .catch((error: any) => {
        setError(error);
        setValue(undefined);
        return Promise.reject(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { loading, error, value, execute };
};
