import React, { useEffect, useState } from "react";
import Button from "../../../src/Components/Button/button.component";
import SlidingPaneUtil from "../../../src/Utils/slidingPane.utils";
import InputField from "../../../src/Components/Input/inputField.component";
import { FormInterface } from "../../../src/Composites/DashboardWrapper/FormBuilder/Types/form.types";
import FormBuilder from "../../../src/Composites/DashboardWrapper/FormBuilder/formBuilder";

const Product = () => {
	const [title, setTitle] = useState("This is Title");
	useEffect(() => {
		SlidingPaneUtil.updateProps({ headingTitle: title });
	}, [title]);
	const form_props: FormInterface = {
		fields: [
			{
				name: "first_name",
				label: "First Name",
				type: "text",
				isRequired: true,
			},
			{
				name: "last_name",
				label: "Last Name",
				type: "text",
			},
			{
				name: "email",
				label: "Email Address",
				type: "email",
			},
			{
				name: "password",
				label: "Password",
				type: "password",
			},
		],
	};

	return <FormBuilder {...form_props} />;
};

export default Product;
