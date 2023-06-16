import { useState, useEffect } from "react";

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [options, setOptions] = useState(null);

  const optionsData = (data) => {
    if (method === "POST") {
      setOptions({
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (method === "PATCH") {
      setOptions({
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (method === "DELETE") {
      setOptions({
        method: "DELETE",
      });
    }
  };

  const fetchData = async () => {
    setIsPending(true);
    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (response.ok) {
        setData(responseData);
        setError(null);
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (
      (method === "POST" || method === "PATCH" || method === "DELETE") &&
      options
    ) {
      fetchData();
    } else if (method === "GET") {
      fetchData();
    }
  }, [url, method, options]);

  return { data, error, isPending, optionsData };
};
