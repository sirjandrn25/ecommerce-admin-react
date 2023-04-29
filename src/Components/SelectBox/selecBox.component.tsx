import Icon from "@Components/Icon/icon.component";
import { PlusIcon } from "@Constants/imageMapping.constants";
import { KeyboardEventHandler, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import CreatableSelect from "react-select/creatable";
import { useUpdateEffect } from "react-use";
import { EmptyFunction, GetObjectFromArray } from "../../Utils/common.utils";
export type SelectOptionType = {
  label: string;
  value: string | number;
  data?: any;
};

export interface SelectBoxType {
  label?: string;
  options?: SelectOptionType[];
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
  loadOptions?: (search?: any) => void;
  async?: boolean;
  isSearchable?: boolean;
  addNew?: () => void;
  placeholder?: string;
}

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const SelectBox = ({
  label,
  options = [],
  onChange = EmptyFunction,
  error = false,
  errorMessage = "",
  isMultiple = false,
  defaultInputValue = "",
  isRequired = false,
  defaultTheme = {},
  className = "",
  isCreatable,
  async,
  loadOptions,
  isSearchable,
  addNew,
  onBlur = EmptyFunction,
  placeholder = "",
}: SelectBoxType) => {
  const [value, setValue] = useState<any>(defaultInputValue);
  const [inputValue, setInputValue] = useState<any>("");

  useUpdateEffect(() => {
    if (!isCreatable) return;
    onChange(value);
  }, [value]);

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

  return (
    <div className={`flex flex-col select-box gap-1 text-sm ${className}`}>
      <div className={`${error ? "text-error" : ""} label-text font-sans`}>
        <span>{label}</span>{" "}
        {isRequired && <span className="text-error">*</span>}
      </div>
      <RenderSelectBox
        {...{
          inputValue,
          setValue,
          setInputValue,
          handleKeyDown,
          value,
          onBlur,
          isCreatable,
          options,
          onChange,
          defaultInputValue,
          error,
          isMultiple,
          defaultTheme,
          async,
          loadOptions,
          isSearchable,
          addNew,
          placeholder,
        }}
      />
      {error && errorMessage && (
        <div className="pl-1 text-xs text-error">{errorMessage}</div>
      )}
    </div>
  );
};

const RenderSelectBox = ({
  inputValue,
  setValue,
  setInputValue,
  handleKeyDown,
  value,
  onBlur,
  isCreatable,
  options,
  onChange,
  defaultInputValue,
  error,
  async,
  loadOptions,
  addNew,
  isSearchable,
  placeholder,
  ...rest
}: any) => {
  const error_color = "#dc143c";
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
  const GetLabel = () => {
    const data = GetObjectFromArray(options, "value", defaultInputValue);

    return data?.label;
  };

  if (async) {
    return (
      <div className="flex items-center w-full">
        <AsyncSelect
          isSearchable={isSearchable}
          loadOptions={loadOptions}
          styles={customStyles}
          cacheOptions
          className="flex-1 border-r-0"
          onChange={onChange}
          defaultOptions={options}
          defaultInputValue={GetLabel()}
          placeholder={"Search ..."}
        />

        {addNew && (
          <Icon
            source={PlusIcon}
            className="flex items-center p-2 justify-center w-[35px] h-[38px] border border-l-0 bg-base-100"
            size={20}
            iconColor="text-info"
            onClick={addNew}
          />
        )}
      </div>
    );
  }
  if (isCreatable) {
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue) => setInputValue(newValue)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={value}
        onBlur={() => onBlur(value)}
        styles={customStyles}
      />
    );
  }

  return (
    <Select
      options={options}
      onChange={(data) => onChange(data)}
      defaultInputValue={GetLabel()}
      styles={customStyles}
      placeholder={placeholder}
      {...rest}
      isSearchable={isSearchable}

      // value={GetLabel()}
    />
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
