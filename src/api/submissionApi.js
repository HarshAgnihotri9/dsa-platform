import { BASE_URL } from '../api/problemApi';

export const runCodeApi = async (data) => {
  const token = localStorage.getItem("token"); // or wherever you store it

  const res = await fetch(`${BASE_URL}/api/submission/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // 🔥 important
    },
    body: JSON.stringify(data),
  });

  return res.json();
};