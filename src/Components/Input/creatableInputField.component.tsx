import { SelectBoxType } from "@Components/SelectBox/selecBox.component";
import { EmptyFunction } from "@Utils/common.utils";
import { KeyboardEventHandler, useState } from "react";

import CreatableSelect from "react-select/creatable";
import { useUpdateEffect } from "react-use";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => {
  return {
    label,
    value: label,
  };
};

const CreatableInputField = ({
  label,

  onChange = EmptyFunction,
  error = false,
  onBlur = EmptyFunction,
  placeholder = "",

  isRequired,
}: SelectBoxType) => {
  const [inputValue, setInputValue] = useState<any>("");
  const [creatableValue, setCreatableValue] = useState<any>("");
  const error_color = "#dc143c";

  useUpdateEffect(() => {
    onChange(creatableValue);
  }, [creatableValue]);

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;

    switch (event.key) {
      case "Enter":
      case "Tab":
        setCreatableValue((prev: any) => {
          return [...prev, createOption(inputValue)];
        });
        event.preventDefault();
        setInputValue("");
    }
  };
  const customStyles = {
    container: (base: any) => ({
      ...base,

      outline: 0,
    }),
    control: (base: any) => ({
      ...base,
      width: "100%",

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

  return (
    <div className="w-full gap-1 col-flex">
      <div className={`${error ? "text-error" : ""} label-text font-sans`}>
        <span>{label}</span>{" "}
        {isRequired && <span className="text-error">*</span>}
      </div>
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => {
          setCreatableValue(newValue);
        }}
        onInputChange={(newValue) => {
          setInputValue(newValue);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        value={creatableValue}
        // onBlur={(value) => setCreatableValue(value)}
        styles={customStyles}
      />
    </div>
  );
};

export default CreatableInputField;
