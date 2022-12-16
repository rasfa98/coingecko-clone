import cn from "classnames";
import { API } from "../api/types";

import "../styles/Table.scss";
import {SkeletonRow, SkeletonImage} from "./Skeleton";

type TableProps = {
  markets: API.Market[];
  isLoading: boolean;
};

const TableSkeleton = () => {
  return (
    <tbody>
      {new Array(10).fill(null).map((_, index) => (
        <tr key={index}>
          <td className="coin">
                <div>
                  <SkeletonImage width={20} height={20} rounded />
                  <SkeletonRow/>
                </div>
              </td>
          <td className="price">
            <SkeletonRow />
          </td>
          <td className="change1h">
            <SkeletonRow />
          </td>
          <td className="change24h">
            <SkeletonRow />
          </td>
          <td className="change7d">
            <SkeletonRow />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Table = ({ markets, isLoading }: TableProps) => {
  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="coin">Coin</th>
          <th className="price">Price</th>
          <th className="change1h">1h</th>
          <th className="change24h">24h</th>
          <th className="change7d">7d</th>
        </tr>
      </thead>

      {isLoading && <TableSkeleton />}

      {!isLoading && (
        <tbody>
          {markets.map((market, index) => (
            <tr key={index}>
              <td className="coin">
                <div>
                  <img
                    width={20}
                    height={20}
                    src={market.image}
                    alt={market.name}
                  />
                  <b>{market.name}</b> {market.symbol.toLocaleUpperCase()}
                </div>
              </td>
              <td className="price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 6,
                }).format(market.current_price)}
              </td>
              <td
                className={cn("change1h", {
                  red: market.price_change_percentage_1h_in_currency < 0,
                  green: market.price_change_percentage_1h_in_currency > 0,
                })}
              >
                {market.price_change_percentage_1h_in_currency.toFixed(2)}%
              </td>
              <td
                className={cn("change24h", {
                  red: market.price_change_percentage_24h_in_currency < 0,
                  green: market.price_change_percentage_24h_in_currency > 0,
                })}
              >
                {market.price_change_percentage_24h_in_currency.toFixed(2)}%
              </td>
              <td
                className={cn("change7d", {
                  red: market.price_change_percentage_7d_in_currency < 0,
                  green: market.price_change_percentage_7d_in_currency > 0,
                })}
              >
                {market.price_change_percentage_7d_in_currency.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;