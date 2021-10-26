import React, { FC, useMemo } from "react";

import { Flex, Table as ChakraTable } from "@chakra-ui/react";
import { useTable, useSortBy, usePagination, Column } from "react-table";

import ErrorPlaceholder from "../ErrorPlaceholder";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";

export interface Props {
  columns: Column[];
  currentPage?: number;
  data: any[];
  hasError?: boolean;
  isLoading?: boolean;
  maxPageCount?: number;
  perPage?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
  onRefreshData: () => void;
}

const Table: FC<Props> = ({
  columns = [],
  currentPage = 1,
  data = [],
  hasError = false,
  isLoading = false,
  maxPageCount = 10,
  perPage = 10,
  onChangeCurrentPage,
  onChangePerPage,
  onRefreshData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return useMemo(
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

  if (hasError) {
    return (
      <ErrorPlaceholder
        title="There was an issue retrieving data"
        subtitle="Please retry or try again later"
        onRetry={onRefreshData}
      />
    );
  }

  return (
    <>
      <Flex direction="column" width="100%" overflowX="auto">
        <ChakraTable {...getTableProps()}>
          <TableHead headerGroups={headerGroups} />
          <TableBody
            getTableBodyProps={getTableBodyProps}
            isLoading={isLoading && !data.length}
            page={page}
            perPage={perPage}
            prepareRow={prepareRow}
          />
        </ChakraTable>
      </Flex>

      <TablePagination
        currentPage={currentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        perPage={perPage}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangePerPage={onChangePerPage}
      />
    </>
  );
};

export default Table;
