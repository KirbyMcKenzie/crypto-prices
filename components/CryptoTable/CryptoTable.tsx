import React, { FC, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { Cryptocurrency } from "../../types/cryptocurrency";

import {
  NameCell,
  CurrentPriceCell,
  PriceChangePercentCell,
  LargeNumberCell,
} from "../Table/TableCells";
import Table from "../Table";
import CryptoTableHeader from "./CryptoTableHeader";
import { Column } from "react-table";

export interface Props {
  cryptocurrencies?: Cryptocurrency[];
  isLoading?: boolean;
  isApiEnabled?: boolean;
  hasError?: boolean;
  currentPage?: number;
  perPage?: number;
  maxPageCount?: number;
  onRefreshData: () => void;
  onChangeApiStatus: () => void;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

const CryptoTable: FC<Props> = ({
  cryptocurrencies = [],
  isLoading = false,
  isApiEnabled = true,
  hasError = false,
  currentPage = 1,
  perPage = 10,
  maxPageCount = 10,
  onRefreshData,
  onChangeApiStatus,
  onChangeCurrentPage,
  onChangePerPage,
}) => {
  const columns: Column[] = useMemo(
    () => [
      {
        accessor: "name",
        Header: () => <Box textAlign="left">{"NAME"}</Box>,
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
        Cell: (props) => (
          <LargeNumberCell value={props.cell.value} isCurrency />
        ),
      },
      {
        Header: "Market Cap",
        accessor: "marketCap",
        Cell: (props) => (
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
    <Flex direction="column" width="100%">
      <CryptoTableHeader
        isLoading={isLoading}
        onChangeApiStatus={onChangeApiStatus}
        isApiEnabled={isApiEnabled}
      />

      <Flex direction="column" marginY={6}>
        <Table
          data={data}
          columns={columns}
          hasError={hasError}
          currentPage={currentPage}
          isLoading={isLoading}
          perPage={perPage}
          maxPageCount={maxPageCount}
          onChangeCurrentPage={onChangeCurrentPage}
          onChangePerPage={onChangePerPage}
          onRefreshData={onRefreshData}
        />
      </Flex>
    </Flex>
  );
};

export default CryptoTable;
