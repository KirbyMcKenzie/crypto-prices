import { render, fireEvent } from "@testing-library/react";
import CryptoTable, { Props } from "./CryptoTable";
import data from "../../mocks/cryptocurrencies_top_200.json";
import { Cryptocurrency } from "../../types/cryptocurrency";

describe("CryptoTable", () => {
  const buildSubject = (props: Props) => {
    return render(<CryptoTable {...props} />);
  };

  const onRefreshData = jest.fn();
  const onChangeApiStatus = jest.fn();
  const onChangeCurrentPage = jest.fn();
  const onChangePerPage = jest.fn();

  afterEach(() => {
    onRefreshData.mockClear();
    onChangeApiStatus.mockClear();
    onChangeCurrentPage.mockClear();
    onChangePerPage.mockClear();
  });

  const defaultProps = {
    currentPage: 0,
    perPage: 10,
    isLoading: false,
    onRefreshData,
    onChangeApiStatus,
    onChangeCurrentPage,
    onChangePerPage,
  };

  describe("with minimum valid props", () => {
    const cryptocurrencies = data.slice(0, 10) as unknown as Cryptocurrency[];

    const props = {
      ...defaultProps,
      cryptocurrencies,
    };

    describe("Crypto list", () => {
      it("renders a list of 10 cryptocurrencies", () => {
        const { getAllByTestId, queryByTestId } = buildSubject(props);
        expect(getAllByTestId("tbody-row").length).toEqual(10);
        expect(queryByTestId("tbody-skeleton")).not.toBeInTheDocument();
      });

      it("renders a skeleton placeholder when loading", () => {
        const { getByTestId, queryAllByTestId } = buildSubject({
          ...defaultProps,
          isLoading: true,
        });

        expect(queryAllByTestId("tbody-row").length).toEqual(0);
        expect(getByTestId("tbody-skeleton")).toBeInTheDocument();
      });

      it("renders an error message when hasError is true", () => {
        const { getByTestId, queryAllByTestId } = buildSubject({
          ...defaultProps,
          isLoading: false,
          hasError: true,
        });

        expect(getByTestId("error-placeholder")).toBeInTheDocument();
        expect(queryAllByTestId("tbody-row").length).toEqual(0);
      });
    });

    describe("Pagination controls", () => {
      it("renders valid pagination controls for the first page", () => {
        const { getByTestId } = buildSubject(props);
        expect(getByTestId("pagination-page-index").innerHTML).toEqual(
          "Page 1"
        );

        expect(getByTestId("pagination-btn-prev")).toBeDisabled();
        expect(getByTestId("pagination-btn-next")).not.toBeDisabled();
      });

      it("calls onChangeCurrentPage when enabled pagination controls are clicked", () => {
        const { getByTestId } = buildSubject(props);

        const prevPageButton = getByTestId("pagination-btn-prev");
        fireEvent.click(prevPageButton);
        expect(onChangeCurrentPage).not.toHaveBeenCalled();

        const nextPageButton = getByTestId("pagination-btn-next");
        fireEvent.click(nextPageButton);
        expect(onChangeCurrentPage).toHaveBeenCalledWith(1);
      });
    });
  });
});
