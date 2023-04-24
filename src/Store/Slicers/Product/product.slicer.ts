import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductSlicerInterface {
  formData?: any;
}

const initialState: ProductSlicerInterface = {
  formData: {},
};

export const counterSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleChangeData: (state: any, action: PayloadAction<any>) => {
      const data = action.payload || {};

      state.formData = {
        ...state?.formData,
        ...data,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleChangeData } = counterSlice.actions;

export default counterSlice.reducer;
