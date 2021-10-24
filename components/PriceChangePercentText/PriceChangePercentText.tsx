import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { formatNumber } from '../../helpers/format';

const getTextColor = (priceChangePercent: number) => {
    if (priceChangePercent === 0) return "gray.500";
    return priceChangePercent > 0 ? "green.500" : "red.500";
}

const formatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}

export interface Props {
    priceChangePercent: number;
}

const PriceChangePercentText: FC<Props> = ({ priceChangePercent }) => {
    const textColor = getTextColor(priceChangePercent);
    const isPositive = priceChangePercent > 0;
    const formattedText = formatNumber(priceChangePercent, formatOptions);

    return (
        <Text color={textColor}>{`${isPositive ? '+' : ''}${formattedText}%`}</Text>
    )
};

export default PriceChangePercentText;