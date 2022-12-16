import { useEffect, useState } from "react";
import coins from "./api/coins";
import { API } from "./api/types";
import Layout from "./components/Layout";
import Table from "./components/Table";

import "./App.scss";

function App() {
  const [markets, setMarkets] = useState<API.Market[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMarkets = async () => {
    setIsLoading(true);

    const data = await coins.markets();
    setMarkets(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <Layout>
      <Table markets={markets} isLoading={isLoading} />
    </Layout>
  );
}

export default App;
