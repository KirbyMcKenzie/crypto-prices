import React, { FC } from "react";
import { chakra, Th, Thead, Tr } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { HeaderGroup } from "react-table";

export interface Props {
  headerGroups: HeaderGroup<Record<any, any>>[];
}

const TableHead: FC<Props> = ({ headerGroups = [] }) => {
  return (
    <Thead>
      {headerGroups.map((headerGroup) => (
        <Tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any, index: number) => (
            <Th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              flex={1}
              isNumeric={index !== 0}
              _hover={{
                backgroundColor: "gray.50",
                transition: "200ms ease-in-out",
              }}
            >
              {column.render("Header")}
              <chakra.span paddingLeft={1.5}>
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
  );
};

export default TableHead;
