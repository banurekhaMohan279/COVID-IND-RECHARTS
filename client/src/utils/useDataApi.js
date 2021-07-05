import { useState, useEffect, useRef } from "react";

const useDataApi = (url, initialData) => {
  const cache = useRef({});
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setIsLoading(false);
      }
      try {
        const result = await fetch(url);
        const res = await result.json();
        setData(res);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [data, isLoading, isError];
};

export default useDataApi;
