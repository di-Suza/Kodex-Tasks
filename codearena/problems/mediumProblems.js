export const mediumProblems = [
  {
    problem: 1,
    title: "Three Sum",
    difficulty: "medium",
    description:
      "Given an array of integers, find all unique triplets that sum up to zero.",
    starterCode: `function threeSum(nums) {
  // Return array of triplets
}`,
    testCases: [
      {
        input: [[-1, 0, 1, 2, -1, -4]],
        expected: [
          [-1, -1, 2],
          [-1, 0, 1],
        ],
      },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
      {
        input: [[-2, 0, 1, 1, 2]],
        expected: [
          [-2, 0, 2],
          [-2, 1, 1],
        ],
      },
    ],
    hints: [
      "Sort the array first",
      "Use three pointers approach",
      "Skip duplicates to avoid duplicate triplets",
      "Fix one element and use two pointers for remaining",
    ],
    tags: ["array", "two-pointers", "sorting"],

    points: 200,
  },
  {
    problem: 2,
    title: "Group Anagrams",
    difficulty: "medium",
    description: "Given an array of strings, group anagrams together.",
    starterCode: `function groupAnagrams(strs) {
  // Return grouped anagrams
}`,

    testCases: [
      {
        input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
      },
      { input: [[""]], expected: [[""]] },
      { input: [["a"]], expected: [["a"]] },
      {
        input: [
          [
            "cab",
            "tin",
            "pew",
            "duh",
            "may",
            "ill",
            "buy",
            "bar",
            "max",
            "doc",
          ],
        ],
        expected: [
          ["cab"],
          ["tin"],
          ["pew"],
          ["duh"],
          ["may"],
          ["ill"],
          ["buy"],
          ["bar"],
          ["max"],
          ["doc"],
        ],
      },
    ],
    hints: [
      "Use sorted string as key in hash map",
      "Alternatively, use character count as key",
      "Group strings with same key together",
    ],
    tags: ["array", "hash-table", "string", "sorting"],
    points: 200,
  },
  {
    problem: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description:
      "Find the length of the longest substring without repeating characters.",
    starterCode: `function lengthOfLongestSubstring(s) {
  // Return length
}`,

    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 },
      { input: ["abcdef"], expected: 6 },
    ],
    hints: [
      "Use sliding window technique",
      "Maintain a set of characters in current window",
      "Move left pointer when duplicate found",
    ],
    tags: ["string", "hash-table", "sliding-window"],

    points: 200,
  },
  {
    problem: 4,
    title: "Set Matrix Zeroes",
    difficulty: "medium",
    description:
      "Given an m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.",
    starterCode: `function setZeroes(matrix) {
  // Modify matrix in-place
}`,

    testCases: [
      {
        input: [
          [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
          ],
        ],
        expected: [
          [1, 0, 1],
          [0, 0, 0],
          [1, 0, 1],
        ],
      },
      {
        input: [
          [
            [0, 1, 2, 0],
            [3, 4, 5, 2],
            [1, 3, 1, 5],
          ],
        ],
        expected: [
          [0, 0, 0, 0],
          [0, 4, 5, 0],
          [0, 3, 1, 0],
        ],
      },
      {
        input: [
          [
            [1, 2, 3, 4],
            [5, 0, 7, 8],
            [0, 10, 11, 12],
            [13, 14, 15, 0],
          ],
        ],
        expected: [
          [0, 0, 3, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
      },
    ],
    hints: [
      "Use first row and first column as markers",
      "Handle first row and first column separately",
      "Space optimized approach O(1)",
    ],
    tags: ["array", "hash-table", "matrix"],

    points: 200,
  },
  {
    problem: 5,
    title: "Word Break",
    difficulty: "medium",
    description:
      "Given a string and a dictionary of words, determine if the string can be segmented into space-separated words from dictionary.",
    starterCode: `function wordBreak(s, wordDict) {
  // Return boolean
}`,

    testCases: [
      { input: ["leetcode", ["leet", "code"]], expected: true },
      { input: ["applepenapple", ["apple", "pen"]], expected: true },
      {
        input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
        expected: false,
      },
      { input: ["aaaaaaa", ["aaaa", "aaa"]], expected: true },
    ],
    hints: [
      "Use dynamic programming approach",
      "dp[i] represents if s[0...i-1] can be segmented",
      "Check all possible splits",
    ],
    tags: ["string", "dynamic-programming", "trie"],

    points: 200,
  },
  {
    problem: 6,
    title: "Number of Islands",
    difficulty: "medium",
    description:
      "Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    starterCode: `function numIslands(grid) {
  // Return number of islands
}`,
    testCases: [
      {
        input: [
          ["1", "1", "0", "0", "0"],
          ["1", "1", "0", "0", "0"],
          ["0", "0", "1", "0", "0"],
          ["0", "0", "0", "1", "1"],
        ],
        expected: 3,
      },
      {
        input: [
          ["1", "1", "1"],
          ["0", "1", "0"],
          ["1", "1", "1"],
        ],
        expected: 1,
      },
      {
        input: [
          ["0", "0", "0"],
          ["0", "0", "0"],
          ["0", "0", "0"],
        ],
        expected: 0,
      },
      {
        input: [
          ["1", "0", "1", "0"],
          ["0", "1", "0", "1"],
          ["1", "0", "1", "0"],
        ],
        expected: 6,
      },
      { input: [["1"]], expected: 1 },
    ],
    hints: [
      "Use DFS or BFS to explore the grid",
      "Mark visited land cells to avoid counting twice",
      "Iterate over the grid to find new islands",
    ],
    tags: ["graph", "dfs", "bfs", "matrix"],

    points: 200,
  },
  {
    problem: 7,
    title: "Course Schedule",
    difficulty: "medium",
    description:
      "There are numCourses courses labeled from 0 to numCourses-1. Given prerequisites, check if you can finish all courses.",
    starterCode: `function canFinish(numCourses, prerequisites) {
  // Return boolean
}`,

    testCases: [
      { input: [2, [[1, 0]]], expected: true },
      {
        input: [
          2,
          [
            [1, 0],
            [0, 1],
          ],
        ],
        expected: false,
      },
      {
        input: [
          4,
          [
            [1, 0],
            [2, 1],
            [3, 2],
          ],
        ],
        expected: true,
      },
      {
        input: [
          3,
          [
            [1, 0],
            [2, 1],
            [0, 2],
          ],
        ],
        expected: false,
      },
    ],
    hints: [
      "Use topological sort",
      "Detect cycle in directed graph",
      "Use DFS with visited states (0=unvisited, 1=visiting, 2=visited)",
    ],
    tags: [
      "graph",
      "depth-first-search",
      "breadth-first-search",
      "topological-sort",
    ],

    points: 200,
  },
  {
    problem: 8,
    title: "Kth Largest Element in Array",
    difficulty: "medium",
    description:
      "Find the kth largest element in an unsorted array without sorting the entire array.",
    starterCode: `function findKthLargest(nums, k) {
  // Return kth largest element
}`,

    testCases: [
      { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
      { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
      { input: [[1], 1], expected: 1 },
      { input: [[7, 6, 5, 4, 3, 2, 1], 3], expected: 5 },
    ],
    hints: [
      "Use QuickSelect algorithm",
      "Use min-heap of size k",
      "Partition like quicksort but only recurse on relevant part",
    ],
    tags: ["array", "divide-and-conquer", "heap", "quickselect"],

    points: 200,
  },
  {
    problem: 9,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    description: "Given a string, find the longest palindromic substring.",
    starterCode: `function longestPalindrome(s) {
  // Return longest palindromic substring
}`,

    testCases: [
      { input: ["babad"], expected: "bab" },
      { input: ["cbbd"], expected: "bb" },
      { input: ["a"], expected: "a" },
      { input: ["ac"], expected: "a" },
      { input: ["racecar"], expected: "racecar" },
    ],
    hints: [
      "Expand around center approach",
      "Consider both odd and even length palindromes",
      "Check all possible centers",
    ],
    tags: ["string", "dynamic-programming", "two-pointers"],

    points: 200,
  },

  {
    problem: 10,
    title: "Evaluate Division",
    difficulty: "medium",
    description:
      "You are given equations in the form A / B = value. Evaluate division queries and return their results. If a query cannot be computed, return -1.0.",
    starterCode: `function calcEquation(equations, values, queries) {
  // Return array of results
}`,
    testCases: [
      {
        input: [
          [
            ["a", "b"],
            ["b", "c"],
          ],
          [2.0, 3.0],
          [
            ["a", "c"],
            ["b", "a"],
            ["a", "e"],
            ["a", "a"],
            ["x", "x"],
          ],
        ],
        expected: [6.0, 0.5, -1.0, 1.0, -1.0],
      },
      {
        input: [
          [["x", "y"]],
          [4.0],
          [
            ["x", "y"],
            ["y", "x"],
            ["x", "x"],
          ],
        ],
        expected: [4.0, 0.25, 1.0],
      },
      {
        input: [
          [
            ["a", "b"],
            ["c", "d"],
          ],
          [3.0, 2.0],
          [
            ["a", "d"],
            ["b", "c"],
            ["a", "c"],
          ],
        ],
        expected: [-1.0, -1.0, -1.0],
      },
    ],
    hints: [
      "Treat variables as graph nodes",
      "A/B = value means A -> B with weight = value, and B -> A with weight = 1/value",
      "Use DFS or BFS to evaluate queries",
      "If variables not connected, return -1.0",
    ],
    tags: ["graph", "depth-first-search", "breadth-first-search", "hash-table"],

    points: 200,
  },
];
