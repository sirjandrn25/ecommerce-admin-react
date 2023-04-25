import { sendRequest } from "@Utils/service.utils";
import React from "react";
import SelectBox, {
  SelectBoxType,
  parseSelectBoxValue,
} from "./selecBox.component";

interface AsyncSelectBoxInterface extends SelectBoxType {
  end_point: string;
  labelKey?: string;
  valueKey?: string;
}

const AsyncSelectBox = ({
  end_point,
  labelKey = "name",
  valueKey = "id",

  ...rest
}: AsyncSelectBoxInterface) => {
  const loadData = (search: string) =>
    new Promise(async (resolve, reject) => {
      const { success, response } = await sendRequest({
        end_point: end_point,
        classParams: {
          search,
        },
      });

      if (success) resolve(parseSelectBoxValue(response, labelKey, valueKey));
      else reject([]);
    });
  return <SelectBox loadOptions={loadData} {...rest} isSearchable async />;
};

export default AsyncSelectBox;
