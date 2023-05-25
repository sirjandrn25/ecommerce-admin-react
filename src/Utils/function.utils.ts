import AddCategoryForm from "@Modules/Admin/Products/Components/addCategory.form";
import { EmptyFunction } from "./common.utils";
import SlidingPaneUtil from "./slidingPane.utils";

export const openAddCategory = (
  callback: any = EmptyFunction,
  data: any = {}
) => {
  return SlidingPaneUtil.open({
    component: AddCategoryForm,
    headingTitle: "Add Category",
    props: {
      data,
      callback: () => {
        SlidingPaneUtil.close();
      },
    },
  });
};
