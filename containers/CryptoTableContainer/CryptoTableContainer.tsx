import React, { FC, useState } from "react";

import CryptoTable from "../../components/CryptoTable";
import useRequest from "../../hooks/useRequest";
import { Cryptocurrency } from "../../types/cryptocurrency";

const CryptoTableContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [isApiEnabled, setIsApiEnabled] = useState<boolean>(true);

  const { data, error, isValidating, mutate } = useRequest<Cryptocurrency[]>(
    {
      // Bit of a hack to mock out an error state
      url: isApiEnabled ? "/v3/coins/markets" : "/v3/shitcoins/markets",
      params: {
        vs_currency: "AUD",
        order: "market_cap_desc",
        per_page: perPage,
        page: currentPage + 1,
        sparkline: false,
      },
    },
    {
      refreshInterval: 10000,
    }
  );

  return (
    <CryptoTable
      cryptocurrencies={data}
      isLoading={isValidating}
      isApiEnabled={isApiEnabled}
      currentPage={currentPage}
      perPage={perPage}
      maxPageCount={20}
      error={error?.message}
      onChangeApiStatus={() => setIsApiEnabled(!isApiEnabled)}
      onChangeCurrentPage={(page) => setCurrentPage(page)}
      onChangePerPage={(page) => setPerPage(page)}
      onRefreshData={() => mutate()}
    />
  );
};

export default CryptoTableContainer;
