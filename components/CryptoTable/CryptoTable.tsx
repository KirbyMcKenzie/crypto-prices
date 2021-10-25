// TODO: km - fix key warnings
/* eslint-disable react/jsx-key */
import React, { FC, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Fade,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Tooltip,
  IconButton,
  Select,
  chakra,
  Skeleton,
} from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";

import { Cryptocurrency } from "../../types/cryptocurrency";

import NameCell from "./Cells/NameCell";
import LargeNumberCell from "./Cells/LargeNumberCell";
import CurrentPriceCell from "./Cells/CurrentPriceCell";
import PriceChangePercentCell from "./Cells/PriceChangePercentCell";

export interface Props {
  cryptocurrencies?: Cryptocurrency[];
  isLoading?: boolean;
  error?: string;
  currentPage?: number;
  perPage?: number;
  maxPageCount?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

const CryptoTable: FC<Props> = ({
  cryptocurrencies = [],
  isLoading = false,
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
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
    <Flex direction="column" height="100%" width="100%">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  _hover={{
                    backgroundColor: "gray.50",
                    transition: "200ms ease-in-out",
                  }}
                >
                  {column.render("Header")}
                  <chakra.span pl="1.5">
                    {column.isSorted &&
                      (column.isSortedDesc ? (
                        <TriangleDownIcon
                          aria-label="sorted descending"
                          height={2.5}
                          width={2.5}
                          mb={0.5}
                        />
                      ) : (
                        <TriangleUpIcon
                          aria-label="sorted ascending"
                          height={2.5}
                          width={2.5}
                          mb={0.5}
                        />
                      ))}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        {isLoading ? (
          <Tbody>
            {[...Array(perPage)].map((_, i) => (
              <Tr padding={0} key={i}>
                {[...Array(6)].map((_, i) => (
                  <Td key={i}>
                    <Skeleton height="26px" width="100%" />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        ) : (
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr
                  {...row.getRowProps()}
                  _hover={{
                    backgroundColor: "gray.50",
                    transition: "200ms ease-in-out",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <Td fontWeight="medium" {...cell.getCellProps()}>
                        <Fade in>{cell.render("Cell")}</Fade>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex alignItems="center">
          <Select
            w={32}
            value={perPage}
            marginRight={4}
            onChange={(e) => {
              onChangePerPage(Number(e.target.value));
            }}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
          <Text>
            {"Page "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>
            {" of "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
        </Flex>

        <Flex>
          <Tooltip label="Previous Page">
            <IconButton
              aria-label="Go to previous page"
              onClick={() => {
                onChangeCurrentPage(currentPage === 0 ? 0 : currentPage - 1);
              }}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              aria-label="Go to next page"
              onClick={() => {
                onChangeCurrentPage(currentPage + 1);
              }}
              isDisabled={!canNextPage}
              ml={4}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CryptoTable;
