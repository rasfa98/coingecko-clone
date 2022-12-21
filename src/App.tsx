import { useState } from "react";
import { useCategories, useCoins } from "./api";
import Alert from "./components/Alert";
import Layout from "./components/Layout";
import Table from "./components/Table";
import Toolbar from "./components/Toolbar";
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

      <h1>CoinGecko Clone</h1>

      <Toolbar
        categories={categories}
        onSelectCategory={(category: string) => setSelectedCategory(category)}
        selectedCategory={selectedCategory}
      />
      <Table coins={coins} isLoading={isLoading} />
    </Layout>
  );
}

export default App;
