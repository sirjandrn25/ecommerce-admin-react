import AsyncSelectBox from "@Components/SelectBox/asyncSelectBox.component";
import { EmptyFunction } from "@Utils/common.utils";
import { asyncService } from "@Utils/service.utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import UnitController from "src/Controllers/unit.controller";
import InputField, { InputFieldType } from "./inputField.component";

type stockInfoType = {
  stock_unit_id: number;
  stock?: number;
};

export interface StockUnitInputInterface extends InputFieldType {
  stockInfo?: stockInfoType;
  defaultStockInfo?: stockInfoType;
  onChange?: (stockInfo?: stockInfoType) => void;
}

const StockUnitInput = ({
  label,
  isRequired,
  error,
  stockInfo,
  defaultStockInfo,
  onChange = EmptyFunction,
  // size='sm',
  ...rest
}: StockUnitInputInterface) => {
  const [inputValue, setInputValue] = useState<any>(defaultStockInfo);

  useUpdateEffect(() => {
    setInputValue(stockInfo);
  }, [stockInfo]);

  const { data = [] } = useQuery({
    queryFn: () =>
      asyncService({
        end_point: UnitController.list(),
      }),
  });

  const handleChange = (key: string, value: any) => {
    const newData: any = {
      ...inputValue,
      [key]: value,
    };
    onChange(newData);
    setInputValue(newData);
  };

  return (
    <div className="w-full col-flex">
      {label && (
        <label
          htmlFor="input_id"
          className={`label-text ${error && "text-error"} `}
        >
          <span>{label}</span>{" "}
          {isRequired && <span className="text-error">*</span>}
        </label>
      )}
      <div className="!items-center row-flex gap-1">
        <AsyncSelectBox
          className="mb-1 min-w-[120px]"
          end_point={UnitController.list()}
          value={inputValue?.stock_unit_id}
          onChange={(option) => handleChange("stock_unit_id", option?.value)}
        />
        <InputField
          type="number"
          className="w-full"
          placeholder="0"
          error={error}
          value={inputValue?.stock}
          onChange={(value) => handleChange("stock", +value)}
        />
      </div>
    </div>
  );
};

export default StockUnitInput;
