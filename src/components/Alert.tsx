import { useEffect, useState } from "react";
import cn from "classnames";

import "../styles/Alert.scss";

type AlertProps = {
  message: string;
  onRemoved?: Function;
};

const Alert = ({ message, onRemoved }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);

      if (onRemoved) {
        setTimeout(() => {
          onRemoved();
        }, 1000);
      }
    }, 4000);
  }, [onRemoved]);

  return (
    <div
      className={cn("Alert", {
        "Alert--visible": showAlert,
      })}
    >
      {message}
    </div>
  );
};

export default Alert;
