export const hardProblems = [
  {
    problem: 1,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Return median
}`,
    testCases: [
      { input: [[1, 3], [2]], expected: 2.0 },
      {
        input: [
          [1, 2],
          [3, 4],
        ],
        expected: 2.5,
      },
      {
        input: [
          [0, 0],
          [0, 0],
        ],
        expected: 0.0,
      },
      { input: [[], [1]], expected: 1.0 },
      { input: [[2], []], expected: 2.0 },
    ],
    hints: [
      "Use binary search on the smaller array",
      "Partition both arrays such that left half contains equal elements",
      "Ensure all elements in left partition are <= right partition",
    ],
    tags: ["array", "binary-search", "divide-and-conquer"],

    points: 300,
  },
  {
    problem: 2,
    title: "Regular Expression Matching",
    difficulty: "hard",
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    starterCode: `function isMatch(s, p) {
  // Return boolean
}`,

    testCases: [
      { input: ["aa", "a"], expected: false },
      { input: ["aa", "a*"], expected: true },
      { input: ["ab", ".*"], expected: true },
      { input: ["aab", "c*a*b"], expected: true },
      { input: ["mississippi", "mis*is*p*."], expected: false },
    ],
    hints: [
      "Use dynamic programming with dp[i][j]",
      "Handle '*' cases carefully - zero occurrence or multiple occurrences",
      "Consider empty string and empty pattern cases",
    ],
    tags: ["string", "dynamic-programming", "recursion"],

    points: 300,
  },
  {
    problem: 3,
    title: "Merge k Sorted Lists",
    difficulty: "hard",
    description:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    starterCode: `function mergeKLists(lists) {
  // Return merged list
}`,

    testCases: [
      {
        input: [
          [
            [1, 4, 5],
            [1, 3, 4],
            [2, 6],
          ],
        ],
        expected: [1, 1, 2, 3, 4, 4, 5, 6],
      },
      { input: [[]], expected: [] },
      { input: [[[]]], expected: [] },
      { input: [[[1], [0]]], expected: [0, 1] },
    ],
    hints: [
      "Use min-heap (priority queue) approach",
      "Alternatively, merge lists in pairs repeatedly",
      "Divide and conquer approach has better time complexity",
    ],
    tags: ["linked-list", "divide-and-conquer", "heap", "merge-sort"],

    points: 300,
  },
  {
    problem: 4,
    title: "Reverse Nodes in k-Group",
    difficulty: "hard",
    description:
      "Given a linked list, reverse the nodes of the list k at a time and return the modified list. k is a positive integer and is less than or equal to the length of the list.",
    starterCode: `function reverseKGroup(head, k) {
  // Return modified list
}`,

    testCases: [
      { input: [[1, 2, 3, 4, 5], 2], expected: [2, 1, 4, 3, 5] },
      { input: [[1, 2, 3, 4, 5], 3], expected: [3, 2, 1, 4, 5] },
      { input: [[1, 2, 3, 4, 5], 1], expected: [1, 2, 3, 4, 5] },
      { input: [[1], 1], expected: [1] },
    ],
    hints: [
      "First check if k nodes are available",
      "Reverse k nodes using standard reversal algorithm",
      "Connect the reversed segment properly with previous and next segments",
    ],
    tags: ["linked-list", "recursion"],

    points: 300,
  },
  {
    problem: 5,
    title: "Wildcard Matching",
    difficulty: "hard",
    description:
      "Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*' where '?' matches any single character and '*' matches any sequence of characters (including empty sequence).",
    starterCode: `function isMatch(s, p) {
  // Return boolean
}`,

    testCases: [
      { input: ["aa", "a"], expected: false },
      { input: ["aa", "*"], expected: true },
      { input: ["cb", "?a"], expected: false },
      { input: ["adceb", "*a*b"], expected: true },
      { input: ["acdcb", "a*c?b"], expected: false },
    ],
    hints: [
      "Use dynamic programming approach",
      "Handle '*' as matching zero characters or multiple characters",
      "Optimize space using two-pointer approach",
    ],
    tags: ["string", "dynamic-programming", "greedy"],

    points: 300,
  },
  {
    problem: 6,
    title: "N-Queens",
    difficulty: "hard",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.",
    starterCode: `function solveNQueens(n) {
  // Return array of solutions
}`,

    testCases: [
      {
        input: [4],
        expected: [
          [".Q..", "...Q", "Q...", "..Q."],
          ["..Q.", "Q...", "...Q", ".Q.."],
        ],
      },
      { input: [1], expected: [["Q"]] },
      { input: [2], expected: [] },
      { input: [3], expected: [] },
    ],
    hints: [
      "Use backtracking with recursion",
      "Track columns, diagonals and anti-diagonals being attacked",
      "Use sets to track occupied columns and diagonals",
    ],
    tags: ["array", "backtracking", "recursion"],

    points: 300,
  },
  {
    problem: 7,
    title: "Sudoku Solver",
    difficulty: "hard",
    description:
      "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules: Each of the digits 1-9 must occur exactly once in each row, each column, and each of the 9 3x3 sub-boxes of the grid.",
    starterCode: `function solveSudoku(board) {
  // Modify board in-place
}`,

    testCases: [
      {
        input: [
          [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        expected: [
          ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
          ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
          ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
          ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
          ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
          ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
          ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
          ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
          ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
        ],
      },
    ],
    hints: [
      "Use backtracking algorithm",
      "Try numbers 1-9 for each empty cell",
      "Check validity for row, column and 3x3 box efficiently",
    ],
    tags: ["array", "backtracking", "matrix"],

    points: 300,
  },
  {
    problem: 8,
    title: "Trapping Rain Water",
    difficulty: "hard",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    starterCode: `function trap(height) {
  // Return total water trapped
}`,

    testCases: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { input: [[4, 2, 3]], expected: 1 },
      { input: [[1, 0, 1]], expected: 1 },
    ],
    hints: [
      "Use two pointers approach",
      "Track left and right maximums",
      "Water trapped at i = min(leftMax, rightMax) - height[i]",
    ],
    tags: ["array", "two-pointers", "dynamic-programming"],

    points: 300,
  },
  {
    problem: 9,
    title: "Sliding Window Maximum",
    difficulty: "hard",
    description:
      "You are given an array of integers nums and an integer k. There is a sliding window of size k moving from the left to the right of the array. Return the maximum value in each sliding window.",
    starterCode: `function maxSlidingWindow(nums, k) {
  // Return array of maximums
}`,

    testCases: [
      { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7] },
      { input: [[1], 1], expected: [1] },
      { input: [[1, -1], 1], expected: [1, -1] },
      { input: [[9, 11], 2], expected: [11] },
    ],
    hints: [
      "Use deque (double ended queue) data structure",
      "Maintain indices in deque in decreasing order of values",
      "Remove elements from deque that are out of current window",
    ],
    tags: ["array", "queue", "sliding-window", "heap"],

    points: 300,
  },
  {
    problem: 10,
    title: "Minimum Window Substring",
    difficulty: "hard",
    description:
      "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return empty string.",
    starterCode: `function minWindow(s, t) {
  // Return minimum window substring
}`,

    testCases: [
      { input: ["ADOBECODEBANC", "ABC"], expected: "BANC" },
      { input: ["a", "a"], expected: "a" },
      { input: ["a", "aa"], expected: "" },
      { input: ["ab", "a"], expected: "a" },
      { input: ["abc", "ac"], expected: "abc" },
    ],
    hints: [
      "Use sliding window technique",
      "Maintain frequency maps for both strings",
      "Expand right pointer until all characters found, then shrink left pointer",
    ],
    tags: ["string", "hash-table", "sliding-window"],

    points: 300,
  },
];
