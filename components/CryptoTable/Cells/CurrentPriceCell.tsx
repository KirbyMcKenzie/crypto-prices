import { FC } from "react";
import { Row } from "react-table";

import { Text } from "@chakra-ui/react";
import { Cryptocurrency } from "../../../types/cryptocurrency";
import { formatNumber } from "../../../helpers/format";

interface Props {
  row: Row;
}

const CurrentPriceCell: FC<Props> = ({ row }) => {
  const crypto = row.original as Cryptocurrency;
  const isPositive = crypto.priceChangePercentage24h > 0;

  return (
    <Text color={isPositive ? "green.500" : "red.500"}>
      {`A$${formatNumber(crypto.currentPrice)}`}
    </Text>
  );
};

export default CurrentPriceCell;
