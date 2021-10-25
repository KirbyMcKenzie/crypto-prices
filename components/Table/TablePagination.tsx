import React, { FC } from "react";
import { Flex, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export interface Props {
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  currentPage?: number;
  pageIndex?: number;
  pageOptions?: number[];
  perPage?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

const TablePagination: FC<Props> = ({
  canPreviousPage = true,
  canNextPage = true,
  currentPage = 0,
  pageIndex = 0,
  pageOptions = [],
  perPage = 10,
  onChangeCurrentPage,
  onChangePerPage,
}) => {
  return (
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
      </Flex>

      <Flex alignItems="center">
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

        <Text marginX={4} fontWeight="medium">
          {`Page ${pageIndex + 1} `}
        </Text>

        <Tooltip label="Next Page">
          <IconButton
            aria-label="Go to next page"
            onClick={() => {
              onChangeCurrentPage(currentPage + 1);
            }}
            isDisabled={!canNextPage}
            // ml={4}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default TablePagination;
