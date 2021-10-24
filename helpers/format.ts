export const formatLargeNumber = (num: number) => {
  switch (!!num) {
    case num >= 1e3 && num < 1e6:
      return +(num / 1e3).toFixed(1) + "K";
    case num >= 1e6 && num < 1e9:
      return +(num / 1e6).toFixed(1) + "M";
    case num >= 1e9 && num < 1e12:
      return +(num / 1e9).toFixed(1) + "B";
    case num >= 1e12:
      return +(num / 1e12).toFixed(1) + "T";
    default:
      return num;
  }
};

const defaultOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 10,
};

export const formatNumber = (
  number: number,
  options: Intl.NumberFormatOptions = defaultOptions
): string => Intl.NumberFormat("en-US", options).format(number);
