import { useEffect, useState } from "react";
import { getProblems } from "../api/problemApi";

export const useProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblems().then((data) => {
      setProblems(data);
      setLoading(false);
    });
  }, []);

  return { problems, loading };
};