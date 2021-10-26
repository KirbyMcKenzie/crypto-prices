import { FC } from "react";
import { Row } from "react-table";

import { Flex, Text, Image } from "@chakra-ui/react";
import { Cryptocurrency } from "../../../types/cryptocurrency";

interface Props {
  row: Row;
}

const NameCell: FC<Props> = ({ row }) => {
  const crypto = row.original as Cryptocurrency;
  return (
    <Flex alignItems="center">
      <Image
        src={crypto.image}
        alt={`${crypto.name} logo`}
        height="26px"
        width="26px"
      />
      <Text marginLeft={2} fontWeight="bold" isTruncated>
        {crypto.name}
      </Text>
      <Text
        marginLeft={2}
        fontWeight="medium"
        color="gray.500"
        textTransform="uppercase"
      >
        {crypto.symbol}
      </Text>
    </Flex>
  );
};

export default NameCell;
