import { BASE_URL } from '../api/problemApi';

export const runCodeApi = async (data) => {
  const token = localStorage.getItem("token"); // or wherever you store it

  const res = await fetch(`${BASE_URL}/submission/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // 🔥 important
    },
    body: JSON.stringify(data),
  });
  

  return res.json();
};

export const submitSolutionApi = async (problemId, token) => {
  const res = await fetch(`${BASE_URL}/submission/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
   "Authorization": `Bearer ${token}` 
    },
    body: JSON.stringify({ problemId }),
  });
  console.log(res);
  

  return res.json();
};