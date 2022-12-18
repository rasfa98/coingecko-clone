import { useEffect, useState, useCallback } from "react";
import coinsService from "./api/coins";
import categoriesService from "./api/categories";
import { API } from "./api/types";
import Layout from "./components/Layout";
import Table from "./components/Table";
import Alert from "./components/Alert";

import "./styles/App.scss";

function App() {
  const [coins, setCoins] = useState<API.Coin[]>([]);
  const [categories, setCategories] = useState<API.Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const getCoinsByCategory = useCallback(async () => {
    try {
      setIsLoading(true);

      const coins = await coinsService.get(selectedCategory);

      setCoins(coins);
      setIsLoading(false);
    } catch {
      setError("API Rate limit error.");
    }
  }, [selectedCategory]);

  const getInitialData = async () => {
    try {
      setIsLoading(true);

      const [coins, categories] = await Promise.all([
        coinsService.get(),
        categoriesService.get(),
      ]);

      setCoins(coins);
      setCategories(categories);
      setIsLoading(false);
    } catch {
      setError("API Rate limit error.");
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (selectedCategory !== null) {
      getCoinsByCategory();
    }
  }, [selectedCategory, getCoinsByCategory]);

  return (
    <Layout>
      {error && <Alert message={error}  onRemoved={() => setError(null)} />}

      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">None</option>
        {categories.map((category, index) => (
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
