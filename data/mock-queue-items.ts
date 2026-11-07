import { QueueItem } from "@/types/workspace";

export const MOCK_QUEUE_ITEMS: QueueItem[] = [
  {
    id: "sub-101",
    unitId: "sma-2104",
    unitCode: "SMA 2104",
    title: "Eigenvalues & Diagonalization Proof Check",
    snippet:
      "I verified that (A - λI)v = 0 yields non-trivial solutions, but the geometric multiplicity for λ=2 is coming out strictly less than the algebraic multiplicity...",
    status: "OPEN",
    priority: "HIGH",
    unread: true,
    createdAt: "10:24 AM",
    student: {
      id: "std-01",
      name: "Phinehas Murage",
      regNumber: "SCT211-0042/2026",
    },
    rubricSummary: [
      { criterion: "Mathematical Rigor", score: 9, maxScore: 10 },
      { criterion: "Matrix Computations", score: 4, maxScore: 5 },
    ],
  },
  {
    id: "sub-102",
    unitId: "sma-2104",
    unitCode: "SMA 2104",
    title: "Assignment 3: Orthogonal Projections",
    snippet:
      "Submission of Theorem 4.2 worked proof along with the Python Gram-Schmidt validation script.",
    status: "IN_REVIEW",
    priority: "NORMAL",
    unread: false,
    createdAt: "Yesterday",
    student: {
      id: "std-02",
      name: "Samantha William",
      regNumber: "SCT211-0077/2026",
    },
    rubricSummary: [
      { criterion: "Gram-Schmidt Steps", score: 10, maxScore: 10 },
      { criterion: "Notation Consistency", score: 5, maxScore: 5 },
    ],
  },
  {
    id: "sub-103",
    unitId: "ics-2105",
    unitCode: "ICS 2105",
    title: "AVL Tree Double Rotation Rebalancing",
    snippet:
      "The balance factor updates properly during Left-Right rotation, but root height gets skewed after deleting terminal leaf nodes.",
    status: "OPEN",
    priority: "URGENT",
    unread: true,
    createdAt: "08:15 AM",
    student: {
      id: "std-03",
      name: "Kadin Rhiel",
      regNumber: "SCT211-0112/2026",
    },
  },
];
