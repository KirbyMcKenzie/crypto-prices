import React, { FC } from "react";
import {
  Box,
  Fade,
  Flex,
  Skeleton,
  SkeletonProps,
  SkeletonCircle,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { Row, TableBodyPropGetter, TableBodyProps } from "react-table";

type GetTableBodyPropsType = (
  propGetter?: TableBodyPropGetter<object> | undefined
) => TableBodyProps;

export interface Props {
  isLoading?: boolean;
  page: Row<object>[];
  perPage?: number;
  getTableBodyProps?: GetTableBodyPropsType;
  prepareRow?: (row: Row<object>) => void;
}

const SkeletonTd = ({ ...props }: SkeletonProps) => (
  <Td>
    <Skeleton height="24px" width="100%" {...props} />
  </Td>
);

const TableBody: FC<Props> = ({
  isLoading = true,
  page = [],
  perPage = 10,
  getTableBodyProps = () => {},
  prepareRow = () => {},
}) => {
  if (isLoading) {
    return (
      <Tbody data-testid="tbody-skeleton">
        {[...Array(perPage)].map((_, i) => (
          <Tr padding={0} key={i}>
            <Td>
              <Flex
                alignItems="center"
                minWidth={{ base: "150px", md: "176px" }}
              >
                <Box>
                  <SkeletonCircle height="26px" width="26px" />
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
            data-testid="tbody-row"
            _hover={{
              backgroundColor: "gray.50",
              transition: "200ms ease-in-out",
            }}
          >
            {row.cells.map((cell) => {
              return (
                <Td isNumeric fontWeight="medium" {...cell.getCellProps()}>
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
