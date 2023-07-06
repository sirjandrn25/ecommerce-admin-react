import Button from "@Components/Button/button.component"
import CreatableInputField from "@Components/Input/creatableInputField.component"
import InputField from "@Components/Input/inputField.component"
import Loading from "@Components/Loading/loading.component"
import useNavigation from "@Hooks/useNavigation.hook"
import { EmptyFunction } from "@Utils/common.utils"

import { useMemo } from "react"
import useProductOption from "../Hooks/userProductOptions.hook"
import { Trash2 } from "lucide-react"


const ProductOption = ({ }: any) => {

  const { query } = useNavigation()
  const { id: product_id } = query || {};
  const { data, isLoading, fetchOptions, optionCreate, createLoading, formData, setFormData, onDelete, deleteLoading } = useProductOption({ product_id })

  // const {
  //   data: options,
  //   isLoading,
  //   refetch: fetchOptions,
  // } = api.admin.productOption.list.useQuery({
  //   product_id: productId,
  // })



  const handleFormData = (key: string, value: any) => {
    setFormData((prev: any) => {
      return {
        ...prev,
        [key]: value,
      }
    })
  }
  const handleSubmit = () => {
    const newData = { ...formData }
    newData.values = formData.values.map((value: any) => ({
      name: value?.value,
    }))

    optionCreate({
      ...newData,
      product_id,
    })
  }
  const loading = useMemo(
    () => createLoading || isLoading,
    [createLoading, isLoading]
  )
  return (
    <div className="relative flex flex-col w-full gap-4">
      {loading && (
        <Loading
          message={
            createLoading ? "Creating Product Option" : "fetching Options"
          }
        />
      )}
      <div className="p-4 rounded bg-base-100 ">
        <div className="flex justify-between w-full">
          <div className="font-bold">Create Option</div>

          <Button
            disabled={
              !formData?.title || !formData?.values?.length || createLoading
            }
            onClick={handleSubmit}
            className="min-w-[100px]"
            size="sm"
          >
            Save{" "}
          </Button>
        </div>
        <div className="flex items-center w-full">
          <OptionForm onChange={handleFormData} item={formData} />
        </div>
      </div>

      <OptionList {...{ options: data, deleteLoading, onDelete }} />
    </div>
  )
}

const OptionList = ({ options = [], deleteLoading, onDelete }: any) => {

  return (
    <div className="relative flex flex-col gap-4 p-4 rounded bg-base-100">
      {deleteLoading && <Loading message="Deleting option ..." />}
      <div className="font-bold">Options</div>
      <div className="grid grid-cols-2 gap-4 ">
        {options?.map((option: any) => {
          return (
            <OptionItem
              onRemove={() =>
                onDelete(option.id)
              }
              key={option?.id}
              {...{ option }}
            />
          )
        })}
      </div>
    </div>
  )
}

const OptionItem = ({ option, onRemove }: any) => {
  const values = useMemo(() => {
    {
      return option.values.map((value: any) => value?.name).join(", ")
    }
  }, [option.values])
  return (
    <div className="flex items-center justify-between p-4 border border-blue-300 rounded">
      <div className="flex items-center">
        <div className="capitalize ">{option.title}</div> :
        <div className="flex items-center px-4 text-sm">{values}</div>
      </div>
      <div className="flex items-center gap-2">
        <Trash2
          size={20}
          strokeWidth={1.5}
          className="cursor-pointer text-error"
          onClick={onRemove}
        />
      </div>
    </div>
  )
}

const OptionForm = ({
  item,

  onChange = EmptyFunction,
}: any) => {
  return (
    <div className="flex items-end justify-between w-full gap-4">
      <InputField
        value={item?.title}
        label="Title"
        className="max-w-[300px] "
        placeholder="Colors"
        onChange={(value: string) => {
          onChange("title", value)
        }}
      />
      <CreatableInputField
        defaultInputValue={item?.values || []}
        label="Values"
        className="flex-1"
        placeholder="Red, Green, and Blue"
        value={item?.values || []}
        onChange={(option: any) => {
          onChange("values", option)
        }}
        isCreatable
      />
    </div>
  )
}

export default ProductOption
