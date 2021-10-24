import React, { FC } from 'react';

import CryptoTable from '../../components/CryptoTable';
import useRequest from '../../hooks/useRequest';
import { Cryptocurrency } from '../../types/Cryptocurrency';

// export interface Props {
// }

const CryptoTableContainer: FC = () => {
    const { data } = useRequest<Cryptocurrency[]>({
        url: 'v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=25&page=1&sparkline=false',
    });

    console.log(data, 'data');

    return (
        <CryptoTable cryptocurrencies={data} />
    )
};

export default CryptoTableContainer;