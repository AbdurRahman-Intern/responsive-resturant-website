// =====================================================================
// MENU SEARCH + CATEGORY FILTER LOGIC
// =====================================================================
// HOW IT WORKS
//   Two pieces of state: `query` (what the user typed) and `category`
//   ("all" or a category id). Every time either changes, React re-runs this
//   hook and we compute the list of dishes to show:
//     1. keep dishes in the selected category (or all of them)
//     2. keep dishes whose name contains the search text
//   The result is NOT stored in state. It is calculated from query + category,
//   which avoids the classic bug of results and filters getting out of sync.
//
// Search matches the dish name in ALL languages, so typing "pulao" or "پلو"
// both find Kabuli Pulao no matter which language is selected.
import { useMemo, useState } from "react";
import { menuItems } from "../data/menu";

// Lowercase + trim so "  Mantu " matches "mantu"
function normalize(text) {
  return String(text).toLowerCase().trim();
}

export function useMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const results = useMemo(() => {
    const search = normalize(query);
    return menuItems.filter((item) => {
      const inCategory = category === "all" || item.category === category;
      // Object.values(item.name) = ["Mantu Dumplings", "منتو", "منتو"]
      const matchesSearch = search === "" || Object.values(item.name).some((name) => normalize(name).includes(search));
      return inCategory && matchesSearch;
    });
  }, [query, category]);

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return { query, setQuery, category, setCategory, results, reset };
}
