import React, { FC, useMemo } from "react";
import {
  Fade,
  Flex,
  Heading,
  Text,
  Spinner,
  Box,
  Switch,
} from "@chakra-ui/react";

import { Cryptocurrency } from "../../types/cryptocurrency";

import NameCell from "./Cells/NameCell";
import LargeNumberCell from "./Cells/LargeNumberCell";
import CurrentPriceCell from "./Cells/CurrentPriceCell";
import PriceChangePercentCell from "./Cells/PriceChangePercentCell";
import Table from "../Table";
import ApiStatusSwitch from "../ApiStatusSwitch";
import CryptoTableHeader from "./CryptoTableHeader";

export interface Props {
  cryptocurrencies?: Cryptocurrency[];
  isLoading?: boolean;
  isApiEnabled?: boolean;
  error?: string;
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
  isLoading = true,
  isApiEnabled = true,
  error,
  currentPage = 1,
  perPage = 10,
  maxPageCount = 10,
  onRefreshData,
  onChangeApiStatus,
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
      <CryptoTableHeader
        isLoading={isLoading}
        onChangeApiStatus={onChangeApiStatus}
        isApiEnabled={isApiEnabled}
      />

      <Flex direction="column" height="100%" width="100%" margin={6}>
        <Table
          data={data}
          columns={columns}
          error={error}
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
