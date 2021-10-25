import React, { FC } from "react";
import { Table as ChakraTable } from "@chakra-ui/react";

import { useTable, useSortBy, usePagination } from "react-table";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import ErrorPlaceholder from "../ErrorPlaceholder";

export interface Props {
  isLoading?: boolean;
  error?: string;
  currentPage?: number;
  perPage?: number;
  maxPageCount?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
  onRefreshData: () => void;
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
  onRefreshData,
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

  if (error) {
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
      <ChakraTable {...getTableProps()}>
        <TableHead headerGroups={headerGroups} />
        <TableBody
          error={error}
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
