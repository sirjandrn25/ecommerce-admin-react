import React, { KeyboardEventHandler, useState } from "react";
import Select from "react-select";
import { EmptyFunction, GetObjectFromArray } from "../../Utils/common.utils";
import CreatableSelect from "react-select/creatable";
import { useUpdateEffect } from "react-use";
export type SelectOptionType = {
  label: string;
  value: string | number;
  data?: any;
};

export type SelectBoxType = {
  label?: string;
  options: SelectOptionType[];
  onChange?: (value: any) => any;
  error?: boolean;
  isMultiple?: boolean;
  defaultInputValue?: any;
  defaultTheme?: any;
  isRequired?: boolean;
  errorMessage?: string;
  className?: string;
  isCreatable?: boolean;
  onBlur?: (option: any) => void;
};

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const SelectBox = ({
  label,
  options,
  onChange = EmptyFunction,
  error = false,
  errorMessage = "",
  isMultiple = false,
  defaultInputValue = "",
  isRequired = false,
  defaultTheme = {},
  className = "",
  isCreatable,
  onBlur = EmptyFunction,
}: SelectBoxType) => {
  const [value, setValue] = useState<any>(defaultInputValue);
  const [inputValue, setInputValue] = useState<any>("");
  const error_color = "#dc143c";
  useUpdateEffect(() => {
    if (!isCreatable) return;
    onChange(value);
  }, [value]);

  const customStyles = {
    // option: (provided: any, state: any) => ({
    // 	...provided,
    // 	borderBottom: "1px dotted pink",
    // 	color: state.isSelected ? "red" : "blue",
    // 	padding: 20,
    // }),
    container: (base: any) => ({
      ...base,
      // width: width,
      outline: 0,
    }),
    control: (base: any) => ({
      ...base,
      width: "100%",
      // minHeight: getHeight(),
      // height: getHeight(),
      borderColor: error && error_color,
      ":hover": {
        borderColor: error ? error_color : `rgb(102,174,232)`,
        boxShadow: `0 2px 4px 1px  rgba(102,174,232,0.2)`,
        outline: 0,
      },
      ":focus-within": {
        borderColor: error ? error_color : `rgb(102,174,232)`,
        borderWidth: "2px",
      },
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev: any) => [...prev, createOption(inputValue)]);

        setInputValue("");
        event.preventDefault();
    }
  };

  const GetLabel = () => {
    const data = GetObjectFromArray(options, "value", defaultInputValue);

    return data?.label;
  };

  return (
    <div className={`flex flex-col select-box gap-1 text-sm ${className}`}>
      <div className={`${error ? "text-error" : ""} label-text font-sans`}>
        {" "}
        <span>{label}</span>{" "}
        {isRequired && <span className="text-error">*</span>}
      </div>
      {isCreatable && (
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={(newValue) => setValue(newValue)}
          onInputChange={(newValue) => setInputValue(newValue)}
          onKeyDown={handleKeyDown}
          placeholder="Type something and press enter..."
          value={value}
          onBlur={() => onBlur(value)}
        />
      )}
      {!isCreatable && (
        <Select
          options={options}
          isMulti={isMultiple}
          onChange={(data) => onChange(data)}
          defaultInputValue={GetLabel()}
          styles={customStyles}
          // value={GetLabel()}
        />
      )}
      {error && errorMessage && (
        <div className="pl-1 text-xs text-error">{errorMessage}</div>
      )}
    </div>
  );
};

export const parseSelectBoxValue = (
  data: any,
  label: any = "",
  value: any = ""
) => {
  return data.map((item: any, index: any) => {
    if (typeof item === "string") {
      return {
        label: item,
        id: index + 1,
        value: item,
      };
    }
    return {
      label: item[label],
      value: item[value],
      data: item,
    };
  });
};
export default SelectBox;
