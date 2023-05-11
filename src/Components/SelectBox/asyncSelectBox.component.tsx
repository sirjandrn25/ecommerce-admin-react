import { asyncService, sendRequest } from "@Utils/service.utils";
import React, { useState } from "react";
import SelectBox, {
  SelectBoxType,
  parseSelectBoxValue,
} from "./selecBox.component";
import { useEffectOnce } from "react-use";
import { GetObjectFromArray, IsEmptyObject } from "@Utils/common.utils";

interface AsyncSelectBoxInterface extends SelectBoxType {
  end_point: string;
  labelKey?: string;
  valueKey?: string;
  document_id?: number;
  classParams?: any;
  method?: "get" | "post" | "put" | "delete";
}

const AsyncSelectBox = ({
  end_point,
  labelKey = "name",
  valueKey = "id",
  document_id,
  classParams = {},
  method = "get",

  ...rest
}: AsyncSelectBoxInterface) => {
  const [tempOptions, setTempOptions] = useState<any>([]);
  useEffectOnce(() => {
    loadData("").then((data: any = []) => {
      if (document_id) {
        const existData = GetObjectFromArray(data, "id", document_id);
        if (!existData || IsEmptyObject(existData)) {
          initalLoadData().then((res) => {
            const data = parseSelectBoxValue([res], labelKey, valueKey);
            setTempOptions(data);
          });
        }
      }
    }); //load initial data

    // check data for edit
  });

  const initalLoadData = () =>
    asyncService({
      end_point: end_point,
      method,
      document_id,
    });

  const loadData = (search?: string) =>
    new Promise(async (resolve, reject) => {
      const { success, response } = await sendRequest({
        end_point: end_point,

        method,
        classParams: {
          search,
          ...classParams,
        },
      });

      if (success) {
        const options = parseSelectBoxValue(response, labelKey, valueKey);
        setTempOptions(options);
        resolve(options);
      } else {
        reject([]);
      }
    });
  return (
    <SelectBox
      options={tempOptions}
      loadOptions={loadData}
      {...rest}
      isSearchable
      async
    />
  );
};

export default AsyncSelectBox;
