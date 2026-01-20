import { useState, useEffect } from "react";
import api from "../services/api";

export default function useFetch(endpoint, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        const res = await api.get(endpoint);
        if (!mounted) return;
        setData(res.data || defaultValue);
      } catch (err) {
        if (!mounted) return;
        setError(err);
        setData(defaultValue);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [endpoint, defaultValue]);

  return [data, loading, error];
}
