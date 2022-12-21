import { useState } from "react";
import { useCategories, useCoins } from "./api";
import { API } from "./api/types";
import Alert from "./components/Alert";
import Layout from "./components/Layout";
import Table from "./components/Table";
import { removeAlert, selectAlerts } from "./app/appSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import "./styles/App.scss";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: coins, isFetching: isLoadingCoins } =
    useCoins(selectedCategory);
  const { data: categories, isFetching: isLoadingCategories } = useCategories();
  const alerts = useAppSelector(selectAlerts);
  
  const dispatch = useAppDispatch();

  const isLoading = isLoadingCoins || isLoadingCategories;

  return (
    <Layout>
      {alerts.length > 0 && (
        <Alert
          message={alerts[0]?.key}
          onRemoved={() =>
            alerts.forEach((a: any) => dispatch(removeAlert(a.id)))
          }
        />
      )}

      <h1>Top cryptocurrencies {new Date().getFullYear()}</h1>

      <label htmlFor="category">Category</label>
      <select
        name="category"
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((category: API.Category, index: number) => (
          <option key={index} value={category.category_id}>
            {category.name}
          </option>
        ))}
      </select>
      <Table coins={coins} isLoading={isLoading} />
    </Layout>
  );
}

export default App;
