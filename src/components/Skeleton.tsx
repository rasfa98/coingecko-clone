import "../styles/Skeleton.scss";

export const SkeletonRow = () => {
  return <div className="Skeleton Skeleton--row" />;
};

export const SkeletonImage = ({
  width = 50,
  height = 50,
  rounded = false,
}: {
  width: number;
  height: number;
  rounded: boolean;
}) => {
  return (
    <div
      className="Skeleton Skeleton--image"
      style={{ width: `${width}px`, height: `${height}px`, borderRadius: rounded ? '50%' : 'none' }}
    />
  );
};
