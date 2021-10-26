import { FC } from "react";

import { Text } from "@chakra-ui/react";
import { formatNumber } from "../../../helpers/format";

const getTextColor = (priceChangePercent: number) => {
  if (priceChangePercent === 0) return "gray.500";
  return priceChangePercent > 0 ? "green.500" : "red.500";
};

const formatOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

interface Props {
  value: number;
}

const PriceChangePercentCell: FC<Props> = ({ value }) => {
  const textColor = getTextColor(value);
  const isPositive = value > 0;
  const formattedText = formatNumber(value, formatOptions);

  return (
    <Text color={textColor}>{`${isPositive ? "+" : ""}${formattedText}%`}</Text>
  );
};

export default PriceChangePercentCell;
