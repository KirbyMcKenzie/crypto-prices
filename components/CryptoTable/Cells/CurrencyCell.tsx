import { FC } from "react";

import { Box } from "@chakra-ui/react";
import { formatNumber } from "../../../helpers/format";

interface Props {
  value: number;
}

const CurrencyCell: FC<Props> = ({ value }) => (
  <Box>{`A$${formatNumber(value)}`}</Box>
);

export default CurrencyCell;
