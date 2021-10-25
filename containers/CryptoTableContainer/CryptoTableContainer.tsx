import React, { FC, useEffect, useState } from "react";

import CryptoTable from "../../components/CryptoTable";
import useRequest from "../../hooks/useRequest";
import { Cryptocurrency } from "../../types/cryptocurrency";

const CryptoTableContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const { data, error, isValidating, mutate } = useRequest<Cryptocurrency[]>(
    {
      url: "/v3/coins/markets",
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
      currentPage={currentPage}
      perPage={perPage}
      onChangeCurrentPage={(newPage) => setCurrentPage(newPage)}
      onChangePerPage={(newPage) => setPerPage(newPage)}
      maxPageCount={20}
      error={error?.message}
      onRefreshData={() => mutate([] as any)}
    />
  );
};

export default CryptoTableContainer;
