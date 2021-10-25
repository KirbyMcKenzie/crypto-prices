import React, { FC, useEffect, useState } from "react";
import {
  Box,
  chakra,
  Fade,
  Flex,
  IconButton,
  Select,
  Skeleton,
  SkeletonCircle,
  Table as ChakraTable,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";

import { Cryptocurrency } from "../../types/cryptocurrency";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import CurrentPriceCell from "../CryptoTable/Cells/CurrentPriceCell";

export interface Props {
  isLoading?: boolean;
  error?: string;
  currentPage?: number;
  perPage?: number;
  maxPageCount?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
  columns: any; // TODO: km - type
  data: any;
}

const Table: FC<Props> = ({
  isLoading = false,
  error,
  currentPage = 1,
  perPage = 10,
  maxPageCount = 10,
  onChangeCurrentPage,
  onChangePerPage,
  columns = [],
  data = [],
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: currentPage,
          }),
          [state, currentPage]
        );
      },
      initialState: { pageIndex: currentPage },
      manualPagination: true,
      pageCount: maxPageCount,
      autoResetSortBy: false,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <ChakraTable {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          page={page}
          perPage={perPage}
          isLoading={isLoading && !data.length}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
        />
      </ChakraTable>
      <TablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        currentPage={currentPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        perPage={perPage}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangePerPage={onChangePerPage}
      />
    </>
  );
};

export default Table;
