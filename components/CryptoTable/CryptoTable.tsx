// TODO: km - fix key warnings
/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
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
import CurrencyCell from "./Cells/CurrencyCell";
import PriceChangePercentCell from "./Cells/PriceChangePercentCell";

const columns = [
  {
    Header: "Cryptocurrencies",
    columns: [
      {
        Header: "Name",
        accessor: "name",
        Cell: NameCell,
      },
      {
        Header: "Price",
        accessor: "currentPrice",
        Cell: CurrencyCell,
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
  },
];

export interface Props {
  cryptocurrencies?: Cryptocurrency[];
  isLoading?: boolean;
  error?: string;
}

const CryptoTable: FC<Props> = ({
  cryptocurrencies = [],
  isLoading = false,
  error,
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
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: cryptocurrencies,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <Flex direction="column" height="100%" margin={12} width="100%">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex alignItems="center">
          <Text mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text>Go to page:</Text>{" "}
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Previous Page">
            <IconButton
              aria-label="Go to previous page"
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Next Page">
            <IconButton
              aria-label="Go to next page"
              onClick={nextPage}
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
