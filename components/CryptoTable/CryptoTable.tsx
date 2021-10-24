import React, { FC } from 'react';
import Image from 'next/image';
import {
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text
} from '@chakra-ui/react';

import { Cryptocurrency } from '../../types/cryptocurrency';
import { formatLargeNumber, formatNumber } from '../../helpers/format';
import PriceChangePercentText from '../PriceChangePercentText';

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
                            <Td>
                                <Flex alignItems="center">
                                    <Image src={crypto.image} alt={`${crypto.name} logo`} height={32} width={32} />
                                    <Text marginLeft={2} fontWeight="bold" isTruncated>{crypto.name}</Text>
                                    <Text marginLeft={2} fontWeight="medium" color="gray.500" textTransform="uppercase">{crypto.symbol}</Text>
                                </Flex>
                            </Td>
                            <Td isNumeric>{`A$${formatNumber(crypto.currentPrice)}`}</Td>
                            <Td isNumeric>
                                <PriceChangePercentText priceChangePercent={crypto.priceChangePercentage24h} />
                            </Td>
                            <Td isNumeric>{`A$${formatLargeNumber(crypto.totalVolume)}`}</Td>
                            <Td isNumeric>{`A$${formatLargeNumber(crypto.marketCap)}`}</Td>
                            <Td isNumeric>{formatLargeNumber(crypto.circulatingSupply)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
};

export default CryptoTable;