export const easyProblems = [
  {
    problem: 1,
    title: "Two Sum",
    difficulty: "easy",
    description:
      "Given an array of integers and a target integer, return indices of the two numbers that add up to the target.",
    starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
    hints: [
      "Try using a hash map (object)",
      "Store complement of each number (target - current)",
      "Check if complement exists in map",
    ],
    tags: ["array", "hash-table"],

    points: 100,
  },
  {
    problem: 2,
    title: "Reverse String",
    difficulty: "easy",
    description:
      "Given a string, return the string reversed without using built-in reverse methods.",
    starterCode: `function reverseString(str) {
  // Write your code here
  
}`,

    testCases: [
      { input: ["hello"], expected: "olleh" },
      { input: ["javascript"], expected: "tpircsavaj" },
      { input: ["a"], expected: "a" },
      { input: [""], expected: "" },
    ],
    hints: [
      "Try using two pointers approach",
      "You can also use a loop from end to start",
      "Convert string to array and swap elements",
    ],
    tags: ["string", "two-pointers"],

    points: 100,
  },
  {
    problem: 3,
    title: "Valid Palindrome",
    difficulty: "easy",
    description:
      "Given a string, check if it is a palindrome (reads same forward and backward), ignoring non-alphanumeric characters and case.",
    starterCode: `function isPalindrome(str) {
  // Write your code here
  
}`,

    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
      { input: ["racecar"], expected: true },
    ],
    hints: [
      "Remove non-alphanumeric characters first",
      "Convert to lowercase for case-insensitive comparison",
      "Use two pointers approach",
    ],
    tags: ["string", "two-pointers", "regex"],

    points: 100,
  },
  {
    problem: 4,
    title: "Maximum Subarray",
    difficulty: "easy",
    description:
      "Find the contiguous subarray with the largest sum and return its sum.",
    starterCode: `function maxSubArray(nums) {
  // Write your code here
  
}`,

    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
      { input: [[-1]], expected: -1 },
    ],
    hints: [
      "Use Kadane's algorithm",
      "Keep track of current sum and maximum sum",
      "Reset current sum if it becomes negative",
    ],
    tags: ["array", "dynamic-programming"],

    points: 100,
  },
  {
    problem: 5,
    title: "Valid Parentheses",
    difficulty: "easy",
    description:
      "Given a string containing just parentheses '(){}[]', determine if the input string is valid.",
    starterCode: `function isValid(s) {
  // Write your code here
  
}`,

    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
    hints: [
      "Use stack data structure",
      "Push opening brackets, pop when matching closing bracket",
      "Check if stack is empty at the end",
    ],
    tags: ["string", "stack"],

    points: 100,
  },
  {
    problem: 6,
    title: "Merge Two Sorted Arrays",
    difficulty: "easy",
    description: "Given two sorted arrays, merge them into one sorted array.",
    starterCode: `function mergeArrays(arr1, arr2) {
  // Write your code here
  
}`,

    testCases: [
      {
        input: [
          [1, 3, 5],
          [2, 4, 6],
        ],
        expected: [1, 2, 3, 4, 5, 6],
      },
      { input: [[1, 2, 3], []], expected: [1, 2, 3] },
      { input: [[], [4, 5, 6]], expected: [4, 5, 6] },
      {
        input: [
          [1, 3],
          [2, 4, 5, 7],
        ],
        expected: [1, 2, 3, 4, 5, 7],
      },
    ],
    hints: [
      "Use two pointers approach",
      "Compare elements from both arrays",
      "Handle remaining elements after one array is exhausted",
    ],
    tags: ["array", "two-pointers", "sorting"],

    points: 100,
  },
  {
    problem: 7,
    title: "First Unique Character",
    difficulty: "easy",
    description:
      "Given a string, find the first non-repeating character and return its index. If it doesn't exist, return -1.",
    starterCode: `function firstUniqChar(s) {
  // Write your code here
  
}`,

    testCases: [
      { input: ["leetcode"], expected: 0 },
      { input: ["loveleetcode"], expected: 2 },
      { input: ["aabb"], expected: -1 },
      { input: ["abcabc"], expected: -1 },
    ],
    hints: [
      "Use a hash map to store character counts",
      "First pass: count occurrences",
      "Second pass: find first character with count 1",
    ],
    tags: ["string", "hash-table"],

    points: 100,
  },
  {
    problem: 8,
    title: "Move Zeroes",
    difficulty: "easy",
    description:
      "Given an array, move all 0's to the end while maintaining the relative order of non-zero elements.",
    starterCode: `function moveZeroes(nums) {
  // Write your code here
  
}`,

    testCases: [
      { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { input: [[0]], expected: [0] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
      { input: [[0, 0, 1]], expected: [1, 0, 0] },
    ],
    hints: [
      "Use two pointers approach",
      "One pointer for current position, one for last non-zero",
      "Swap elements when non-zero is found",
    ],
    tags: ["array", "two-pointers"],

    points: 100,
  },
  {
    problem: 9,
    title: "Contains Duplicate",
    difficulty: "easy",
    description:
      "Given an array of integers, check if any value appears at least twice.",
    starterCode: `function containsDuplicate(nums) {
  // Write your code here
  
}`,

    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { input: [[]], expected: false },
    ],
    hints: [
      "Use a Set or hash map",
      "Check if current element already exists in set",
      "Return true as soon as duplicate is found",
    ],
    tags: ["array", "hash-table", "set"],

    points: 100,
  },
  {
    problem: 10,
    title: "Best Time to Buy Sell Stock",
    difficulty: "easy",
    description:
      "Given array where elements are stock prices, find maximum profit from one transaction.",
    starterCode: `function maxProfit(prices) {
  // Write your code here
  
}`,

    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2, 3, 4, 5]], expected: 4 },
      { input: [[2, 1, 2, 0, 1]], expected: 1 },
    ],
    hints: [
      "Keep track of minimum price so far",
      "Calculate profit for each day",
      "Update maximum profit found",
    ],
    tags: ["array", "dynamic-programming"],

    points: 100,
  },
];
