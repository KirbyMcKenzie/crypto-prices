import React, { FC } from 'react';
import {
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import { Cryptocurrency } from '../../types/cryptocurrency';


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
    return (
        <Flex direction="column" height="100%" margin={12} width="100%">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>name</Th>
                        <Th isNumeric>price</Th>
                        <Th isNumeric>change</Th>
                        <Th isNumeric>volume (24hr)</Th>
                        <Th isNumeric>market cap</Th>
                        <Th isNumeric>supply</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {cryptocurrencies.map((crypto) => (
                        <Tr key={crypto.id}>
                            <Td>{crypto.name}</Td>
                            <Td isNumeric>{crypto.currentPrice}</Td>
                            <Td isNumeric>{crypto.priceChange24h}</Td>
                            <Td isNumeric>{crypto.totalVolume}</Td>
                            <Td isNumeric>{crypto.marketCap}</Td>
                            <Td isNumeric>{crypto.totalSupply}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
};

export default CryptoTable;