import React, { FC, useState } from "react";

import CryptoTable from "../../components/CryptoTable";
import useRequest from "../../hooks/useRequest";
import { Cryptocurrency } from "../../types/cryptocurrency";

const CryptoTableContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const { data, isValidating } = useRequest<Cryptocurrency[]>({
    url: "/v3/coins/markets",
    params: {
      vs_currency: "AUD",
      order: "market_cap_desc",
      per_page: perPage,
      page: currentPage + 1,

      sparkline: false,
    },
  });

  return (
    <CryptoTable
      cryptocurrencies={data}
      isLoading={isValidating}
      currentPage={currentPage}
      perPage={perPage}
      onChangeCurrentPage={(newPage) => setCurrentPage(newPage)}
      onChangePerPage={(newPage) => setPerPage(newPage)}
      maxPageCount={10}
    />
  );
};

export default CryptoTableContainer;
