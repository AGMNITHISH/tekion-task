const arr = [
  { id: "1", name: "Shopping cart", url: "/" },
  { id: "2", name: "EMI Calculator", url: "/emiCalc" },
  { id: "3", name: "React table with Kanban Board", url: "/react-tbl" },
  { id: "4", name: "Video gallery", url: "/videoGallery" },
];

export function findActiveRoute(path) {
  const result = arr.filter((item) => item.url === path);
  return result;
}
