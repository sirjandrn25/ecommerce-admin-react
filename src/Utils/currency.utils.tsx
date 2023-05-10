export const FormatCurrency = (amount: number, options: any = {}) => {
  return (
    <div className={`row-flex items-center  `}>
      ${options?.no_decimal === false ? amount.toFixed(2) : Math.trunc(amount)}
    </div>
  );
};
