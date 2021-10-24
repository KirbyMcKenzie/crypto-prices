import { FC } from "react";

import { Box } from "@chakra-ui/react";
import { formatLargeNumber } from "../../../helpers/format";

interface Props {
  value: number;
  isCurrency?: boolean;
}

const LargeNumberCell: FC<Props> = ({ value, isCurrency = false }) => (
  <Box>{`${isCurrency ? "A$" : ""}${formatLargeNumber(value)}`}</Box>
);

export default LargeNumberCell;
