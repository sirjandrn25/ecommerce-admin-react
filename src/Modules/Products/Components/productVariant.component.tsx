import Button from "@Components/Button/button.component"
import Loading from "@Components/Loading/loading.component"
import SelectBox, { parseSelectBoxValue } from "@Components/SelectBox/selecBox.component"
import { Capitalize } from "@Utils/common.utils"
import { FormatCurrency } from "@Utils/currency.utils"
import { Edit, Trash2 } from "lucide-react"
import { useCallback, useMemo } from "react"
import useProductVariant from "../Hooks/useProductVariant.hook"

const ProductVariant = () => {

  const { data: variants, fetchVariants, setFormData, isLoading: variantLoading, onSubmit, renderFormField, createLoading, setEditId, selectedValues, setSelectedValues, isEdit, options } = useProductVariant()





  const handleSelect = (key: string, value: any) =>
    setSelectedValues((prev: any) => {
      return {
        ...prev,
        [key]: value,
      }
    })

  const renderLoading = () => {
    let loading_message = ""
    if (createLoading) {
      loading_message = "Creating Variant..."
    }
    else if (variantLoading) {
      loading_message === "fetching product variants..."
    }
    if (loading_message) {
      return <Loading message={loading_message} />
    }
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditId(item?.id)
  }

  return (
    <div className="relative flex flex-col w-full gap-4">
      {renderLoading()}
      <div className="p-4 rounded bg-base-100 ">
        <div className="flex items-center justify-between w-full">
          <div className="font-bold">
            {isEdit ? "Edit Variant" : "Create Variant"}
          </div>
          <Button
            disabled={createLoading}
            onClick={onSubmit}
            className="min-w-[100px]"
            size="sm"
          >
            Save{" "}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {renderFormField("title")}
          {renderFormField("stock")}
          {renderFormField("selling_price")}
          {renderFormField("cost_price")}

          {!isEdit &&
            // @ts-ignore
            options?.map((option) => (
              <RenderSelectOption
                key={option?.id}
                {...{ option, selectedValues, handleSelect }}
              />
            ))}
        </div>
      </div>
      <VariantList {...{ variants, fetchVariants, handleEdit }} />
    </div>
  )
}

const RenderSelectOption = ({ option, selectedValues, handleSelect }: any) => {
  const options = parseSelectBoxValue(option?.values || [], "name", "id")
  const getValue = useMemo(() => {
    return selectedValues[option?.id]
  }, [option?.id, selectedValues])
  return (
    <SelectBox
      label={Capitalize(option?.title)}
      {...{ options }}
      value={getValue}
      onChange={(value) => {
        handleSelect(option?.id, value?.value)
      }}
    />
  )
}

const VariantList = ({ variants, fetchVariants, toast, handleEdit }: any) => {
  // const { mutate: removeVariant, isLoading: removeLoading } =
  //   api.admin.productVariant.remove.useMutation({
  //     onSuccess: () => {
  //       fetchVariants()
  //       toast({
  //         title: "Variant Remove Successfully",
  //       })
  //     },
  //   })
  return (
    <div className="relative flex flex-col gap-4 p-4 rounded bg-base-100">
      {/* {removeLoading && <Loading message="Variant Removing ...." />} */}
      <div className="font-bold">Variants</div>
      <div className="relative grid grid-cols-2 gap-4">
        {variants?.map((item: any) => (
          <VariantItem
            // onRemove={() => removeVariant({ id: item.id })}
            onEdit={() => handleEdit(item)}
            key={item?.id}
            {...{ item }}
          />
        ))}
      </div>
    </div>
  )
}

const VariantItem = ({ item, onRemove, onEdit }: any) => {
  const renderValue = useCallback((value?: any) => {
    return (
      <div className="flex items-center gap-1 text-sm">
        <span className="capitalize"> {value?.option?.title}:</span>{" "}
        <span>{value?.name}</span>
      </div>
    )
  }, [])
  return (
    <div className="flex flex-col gap-1 p-4 px-4 py-2 border border-blue-300 rounded">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium capitalize">
          {item?.title || "Variant Title"}
        </div>
        <div className="flex items-center gap-2">
          <Trash2
            size={20}
            strokeWidth={1.5}
            className="cursor-pointer text-error"
            onClick={onRemove}
          />

          <Edit
            size={20}
            strokeWidth={1.5}
            className="cursor-pointer text-info"
            onClick={onEdit}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 ">
        <div className="flex items-center gap-1 text-sm">
          <span>Selling Price:</span> {FormatCurrency(item?.selling_price)}
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span> Stock:</span> <span>{item?.stock}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {item?.option_values?.map((value: any) => renderValue(value))}
      </div>
    </div>
  )
}

export default ProductVariant
