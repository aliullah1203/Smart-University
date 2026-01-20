import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Custom hook to fetch data from an API endpoint.
 * @param {string} endpoint - API endpoint to fetch
 * @param {any} defaultValue - initial state value
 * @returns {Array} [data, loading, error]
 */
export default function useFetch(endpoint, defaultValue = null) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(endpoint);
        setData(res.data || defaultValue);
      } catch (err) {
        setError(err);
        setData(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, defaultValue]);

  return [data, loading, error];
}
