import { Sparklines, SparklinesLine } from "react-sparklines";

type SparklineProps = {
  data: number[];
  color: string;
};

const Sparkline = ({ data, color }: SparklineProps) => {
  return (
    <Sparklines data={data}>
      <SparklinesLine style={{ fill: "none" }} color={color} />
    </Sparklines>
  );
};

export default Sparkline;
