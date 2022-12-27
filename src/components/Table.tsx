import cn from "classnames";
import { API } from "../api/types";
import { selectCurrency } from "../app/appSlice";
import { useAppSelector } from "../app/hooks";
import { SkeletonRow, SkeletonImage } from "./Skeleton";
import Sparkline from "./Sparkline";
import getSparklineColor from "../utils/getSparklineColor";

import "../styles/Table.scss";

type TableProps = {
  coins?: API.Coin[];
  isLoading: boolean;
};

const TableSkeleton = () => {
  return (
    <tbody>
      {new Array(20).fill(null).map((_, index) => (
        <tr key={index}>
          <td className="coin">
            <div>
              <SkeletonImage width={20} height={20} rounded />
              <SkeletonRow />
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
          <td className="last7days">
            <SkeletonRow />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const Table = ({ coins, isLoading }: TableProps) => {
  const currency = useAppSelector(selectCurrency);

  return (
    <table className="Table">
      <thead>
        <tr>
          <th className="coin">Coin</th>
          <th className="price">Price</th>
          <th className="change1h">1h</th>
          <th className="change24h">24h</th>
          <th className="change7d">7d</th>
          <th className="last7days">Last 7 Days</th>
        </tr>
      </thead>

      {isLoading && <TableSkeleton />}

      {!isLoading && (
        <tbody>
          {coins?.map((coin, index) => (
            <tr key={index}>
              <td className="coin">
                <div>
                  <img
                    loading="lazy"
                    width={20}
                    height={20}
                    src={coin.image}
                    alt={coin.name}
                  />
                  <b>{coin.name}</b> {coin.symbol.toLocaleUpperCase()}
                </div>
              </td>
              <td className="price">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency,
                  maximumFractionDigits: 6,
                }).format(coin.current_price)}
              </td>
              <td
                className={cn("change1h", {
                  red: coin.price_change_percentage_1h_in_currency < 0,
                  green: coin.price_change_percentage_1h_in_currency > 0,
                })}
              >
                {coin.price_change_percentage_1h_in_currency
                  ? `${coin.price_change_percentage_1h_in_currency.toFixed(2)}%`
                  : "-"}
              </td>
              <td
                className={cn("change24h", {
                  red: coin.price_change_percentage_24h_in_currency < 0,
                  green: coin.price_change_percentage_24h_in_currency > 0,
                })}
              >
                {coin.price_change_percentage_24h_in_currency
                  ? `${coin.price_change_percentage_24h_in_currency.toFixed(
                      2
                    )}%`
                  : "-"}
              </td>
              <td
                className={cn("change7d", {
                  red: coin.price_change_percentage_7d_in_currency < 0,
                  green: coin.price_change_percentage_7d_in_currency > 0,
                })}
              >
                {coin.price_change_percentage_7d_in_currency
                  ? `${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`
                  : "-"}
              </td>
              <td className="last7days">
                {coin.sparkline_in_7d.price.length > 0 ? (
                  <Sparkline
                    data={coin.sparkline_in_7d.price}
                    color={getSparklineColor(coin.sparkline_in_7d.price)}
                  />
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
