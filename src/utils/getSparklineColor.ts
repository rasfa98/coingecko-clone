import colors from "../styles/colors.module.scss";

const getSparklineColor = (data: number[]) => {
  return data[0] < data[data.length - 1] ? colors.green : colors.red;
};

export default getSparklineColor;
