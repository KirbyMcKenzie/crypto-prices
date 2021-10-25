import React, { FC } from "react";
import {
  Box,
  Fade,
  Flex,
  Skeleton,
  SkeletonProps,
  SkeletonCircle,
  Text,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";

export interface Props {
  error?: string;
  page: Row<object>[];
  perPage?: number;
  isLoading?: boolean;
  getTableBodyProps?: (
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  prepareRow?: (row: Row<object>) => void;
}

const SkeletonTd = ({ ...props }: SkeletonProps) => (
  <Td>
    <Skeleton height="24px" width="100%" {...props} />
  </Td>
);

const TableBody: FC<Props> = ({
  error,
  page = [],
  perPage = 10,
  isLoading = true,
  getTableBodyProps = () => {},
  prepareRow = () => {},
}) => {
  if (isLoading) {
    return (
      <Tbody>
        {[...Array(perPage)].map((_, i) => (
          <Tr padding={0} key={i}>
            <Td>
              <Flex
                alignItems="center"
                minWidth={{ base: "150px", md: "182px" }}
              >
                <Box>
                  <SkeletonCircle height="32px" width="32px" />
                </Box>
                <Skeleton
                  height="24px"
                  width="100%"
                  backgroundColor="green.500"
                  marginX={2}
                />
              </Flex>
            </Td>
            <SkeletonTd minWidth="100px" />
            <SkeletonTd />
            <SkeletonTd />
            <SkeletonTd />
            <SkeletonTd />
          </Tr>
        ))}
      </Tbody>
    );
  }

  return (
    <Tbody {...getTableBodyProps()}>
      {page.map((row) => {
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
  );
};

export default TableBody;
