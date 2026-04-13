export const getSolvedProblems = () => {
  return JSON.parse(localStorage.getItem("solved")) || [];
};

export const markProblemSolved = (id) => {
  const solved = getSolvedProblems();

  if (!solved.includes(id)) {
    const updated = [...solved, id];
    localStorage.setItem("solved", JSON.stringify(updated));
  }
};