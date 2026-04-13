const BASE_URL = "http://localhost:8080/api";

export const runCodeApi = async (data) => {
  const res = await fetch(`${BASE_URL}/submission/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};