import { FC } from "react";

import { Text } from "@chakra-ui/react";
import { formatLargeNumber } from "../../../helpers/format";

interface Props {
  value: number;
  isCurrency?: boolean;
}

const LargeNumberCell: FC<Props> = ({ value, isCurrency = false }) => (
  <Text>{`${isCurrency ? "A$" : ""}${formatLargeNumber(value)}`}</Text>
);

export default LargeNumberCell;
