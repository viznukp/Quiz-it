const COLORS = [
  "bg-red-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-purple-300",
  "bg-pink-300",
];

export const randomColorClass = () =>
  COLORS[Math.floor(Math.random() * COLORS.length)];
