export const problems = [
  {
    id: "1",
    topic: "arrays",
    title: "Two Sum",
    description: "Find two numbers such that they add up to target.",
      difficulty:"Easy",

    hints: [
      "Can we try checking all pairs?",
      "Is there a way to reduce nested loops?",
      "What if we store previously seen numbers?",
      "Use a hashmap for faster lookup",
    ],

    approaches: [
      {
        title: "Brute Force",
        explanation: "Check every pair using nested loops.",
        complexity: "O(n^2)",
      },
      {
        title: "Optimal Approach",
        explanation: "Use hashmap to store visited numbers.",
        complexity: "O(n)",
      },
    ],
    testCases: [
  {
    input: "[2,7,11,15], target=9",
    expected: "[0,1]",
  },
  {
    input: "[3,2,4], target=6",
    expected: "[1,2]",
  },
],

    code: `
function twoSum(nums, target) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map[diff] !== undefined) {
      return [map[diff], i];
    }
    map[nums[i]] = i;
  }
}
    `,
  },
];