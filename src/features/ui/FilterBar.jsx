import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setCategoryFilter, setSortBy } from "./uiSlice";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export default function FilterBar() {
  const dispatch = useDispatch();

  const ui = useSelector((state) => state.ui) || {};
  const searchQuery = ui.searchQuery || "";
  const categoryFilter = ui.categoryFilter || "All";
  const sortBy = ui.sortBy || "Recently Added";
  const categories = ui.categories || [
    "Entertainment",
    "Software",
    "Utilities",
    "Health & Fitness",
  ];

  return (
    <div className="glass-card p-4 border-white/10 shadow-xl mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="w-full glass-input pl-10 pr-4 py-2.5 text-sm"
        />
      </div>

      <div className="relative md:w-48">
        <Filter
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
          size={16}
        />
        <select
          value={categoryFilter}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="w-full glass-input pl-10 pr-4 py-2.5 text-sm appearance-none cursor-pointer"
        >
          <option value="All" className="bg-neutral-900">
            All Categories
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="bg-neutral-900">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="relative md:w-56">
        <ArrowUpDown
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-500"
          size={16}
        />
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="w-full glass-input pl-10 pr-4 py-2.5 text-sm appearance-none cursor-pointer"
        >
          <option value="Recently Added" className="bg-neutral-900">
            Recently Added
          </option>
          <option value="Price: High to Low" className="bg-neutral-900">
            Price: High to Low
          </option>
          <option value="Price: Low to High" className="bg-neutral-900">
            Price: Low to High
          </option>
          <option value="Name: A to Z" className="bg-neutral-900">
            Name: A to Z
          </option>
        </select>
      </div>
    </div>
  );
}
