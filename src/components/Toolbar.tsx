import { API } from "../api/types";
import { selectCurrency, setCurrency } from "../app/appSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import "../styles/Toolbar.scss";

type ToolbarProps = {
  categories?: API.Category[];
  selectedCategory: string;
  onSelectCategory: Function;
};

const Toolbar = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: ToolbarProps) => {
  const currency = useAppSelector(selectCurrency);

  const dispatch = useAppDispatch();

  return (
    <div className="Toolbar">
      <div>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={selectedCategory || ""}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((category: API.Category, index: number) => (
            <option key={index} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="currency">Target Currency</label>
        <select
          name="currency"
          value={currency || ""}
          onChange={(e) => dispatch(setCurrency(e.target.value))}
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
          <option value="sek">SEK</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
