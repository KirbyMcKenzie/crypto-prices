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
      // Bit of a hack to force the api to return an error
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

  const handleChangeApiStatus = () => setIsApiEnabled(!isApiEnabled);
  const handleChangeCurrentPage = (page: number) => setCurrentPage(page);
  const handleChangePerPage = (page: number) => setPerPage(page);
  const handleRefreshData = () => mutate();

  return (
    <CryptoTable
      currentPage={currentPage}
      cryptocurrencies={data}
      error={error?.message}
      isLoading={isValidating}
      isApiEnabled={isApiEnabled}
      maxPageCount={20}
      perPage={perPage}
      onChangeApiStatus={handleChangeApiStatus}
      onChangeCurrentPage={handleChangeCurrentPage}
      onChangePerPage={handleChangePerPage}
      onRefreshData={handleRefreshData}
    />
  );
};

export default CryptoTableContainer;
