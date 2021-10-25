import React, { FC, useMemo } from "react";
import { Fade, Flex, Heading, Text, Spinner } from "@chakra-ui/react";

import { Cryptocurrency } from "../../types/cryptocurrency";

import NameCell from "./Cells/NameCell";
import LargeNumberCell from "./Cells/LargeNumberCell";
import CurrentPriceCell from "./Cells/CurrentPriceCell";
import PriceChangePercentCell from "./Cells/PriceChangePercentCell";
import Table from "../Table";

export interface Props {
  cryptocurrencies?: Cryptocurrency[];
  isLoading?: boolean;
  hasData?: boolean;
  error?: string;
  currentPage?: number;
  perPage?: number;
  maxPageCount?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

const CryptoTable: FC<Props> = ({
  cryptocurrencies = [],
  isLoading = true,
  hasData = false,
  error,
  currentPage = 1,
  perPage = 10,
  maxPageCount = 10,
  onChangeCurrentPage,
  onChangePerPage,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: NameCell,
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        Cell: CurrentPriceCell,
      },
      {
        Header: "Change",
        accessor: "priceChangePercentage24h",
        Cell: PriceChangePercentCell,
      },
      {
        Header: "Volume (24hr)",
        accessor: "totalVolume",
        Cell: (props: any) => (
          <LargeNumberCell value={props.cell.value} isCurrency />
        ),
      },
      {
        Header: "Market Cap",
        accessor: "marketCap",
        Cell: (props: any) => (
          <LargeNumberCell value={props.cell.value} isCurrency />
        ),
      },
      {
        Header: "Supply",
        accessor: "circulatingSupply",
        Cell: LargeNumberCell,
      },
    ],
    []
  );

  const data = React.useMemo(() => cryptocurrencies, [cryptocurrencies]);

  return (
    <Flex direction="column" width="100%" margin={10}>
      <Heading
        as="h1"
        fontSize={{ base: "xx-large", md: "xxx-large" }}
        fontWeight="extrabold"
        marginBottom={2}
        marginX={{ base: 2, md: 0 }}
      >
        {"Crypto by Market Cap"}
      </Heading>

      <Flex alignItems="center">
        <Text
          fontWeight="bold"
          fontSize="large"
          color="gray.500"
          marginX={{ base: 2, md: 0 }}
        >
          {"In the past 24 hours"}
        </Text>
        <Fade in={isLoading} unmountOnExit>
          <Spinner marginLeft={2} marginTop={1} size="xs" color="blue.500" />
        </Fade>
      </Flex>

      <Flex direction="column" height="100%" width="100%" margin={6}>
        <Table
          data={data}
          columns={columns}
          currentPage={currentPage}
          isLoading={isLoading}
          perPage={perPage}
          maxPageCount={maxPageCount}
          onChangeCurrentPage={onChangeCurrentPage}
          onChangePerPage={onChangePerPage}
        />
      </Flex>
    </Flex>
  );
};

export default CryptoTable;
