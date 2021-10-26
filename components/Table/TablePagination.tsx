import React, { ChangeEvent, FC } from "react";
import { Flex, IconButton, Select, Text, Tooltip } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const pageSizeOptions = [10, 25, 50, 100];

export interface Props {
  canPreviousPage?: boolean;
  canNextPage?: boolean;
  currentPage?: number;
  isLoading?: boolean;
  pageIndex?: number;
  perPage?: number;
  onChangeCurrentPage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

const TablePagination: FC<Props> = ({
  canPreviousPage = true,
  canNextPage = true,
  currentPage = 0,
  isLoading = false,
  pageIndex = 0,
  perPage = 10,
  onChangeCurrentPage,
  onChangePerPage,
}) => {
  const handleChangePerPage = (event: ChangeEvent<HTMLSelectElement>) =>
    onChangePerPage(Number(event.target.value));

  const handleNextPage = () => onChangeCurrentPage(currentPage + 1);

  const handlePreviousPage = () =>
    onChangeCurrentPage(currentPage === 0 ? 0 : currentPage - 1);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginY={4}
      marginX={{ base: 0, md: 4 }}
    >
      <Flex alignItems="center">
        <Select
          value={perPage}
          width={32}
          marginRight={4}
          onChange={handleChangePerPage}
        >
          {pageSizeOptions.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {`Show ${pageSize}`}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex alignItems="center">
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="Go to previous page"
            data-testid="pagination-btn-prev"
            icon={<ChevronLeftIcon h={6} w={6} />}
            isDisabled={!canPreviousPage || isLoading}
            onClick={handlePreviousPage}
          />
        </Tooltip>

        <Text
          data-testid="pagination-page-index"
          marginX={4}
          fontWeight="medium"
        >
          {`Page ${pageIndex + 1}`}
        </Text>

        <Tooltip label="Next Page">
          <IconButton
            aria-label="Go to next page"
            data-testid="pagination-btn-next"
            icon={<ChevronRightIcon h={6} w={6} />}
            isDisabled={!canNextPage || isLoading}
            onClick={handleNextPage}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default TablePagination;
