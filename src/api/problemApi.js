// const BASE_URL = "http://localhost:8080/api";

 export const BASE_URL = "https://backend-dsa.vercel.app/api";




export const getProblems = async () => {
  const res = await fetch(`${BASE_URL}/problems`);
  return res.json();
};

export const getProblemBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/problems/${slug}`);
  return res.json();
};