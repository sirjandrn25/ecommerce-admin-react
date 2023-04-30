import React from "react";
import InputField, { InputBaseType } from "./inputField.component";
import {
  DollorIcon,
  EuroIcon,
  PoundIcon,
  RupeeIcon,
} from "@Constants/imageMapping.constants";
import Icon from "@Components/Icon/icon.component";

interface CurrencyInput extends InputBaseType {
  symbol: "rupee" | "dollor" | "euro" | "pound";
  currency?: string;
}
const symbolIcon = {
  rupee: RupeeIcon,
  euro: EuroIcon,
  dollor: DollorIcon,
  pound: PoundIcon,
};

const CurrencyInput = ({ symbol, currency, ...rest }: CurrencyInput) => {
  return (
    <InputField
      prefix={<Icon source={symbolIcon[symbol]} isReactIcon />}
      {...rest}
      type="number"
    />
  );
};

export default CurrencyInput;
