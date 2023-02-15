import { useEffect, useState } from "react";
import { SelectOptionType } from "../../../src/Components/SelectBox/selecBox.component";
import FormBuilder from "../../../src/Composites/DashboardWrapper/FormBuilder/formBuilder";
import { FormInterface } from "../../../src/Composites/DashboardWrapper/FormBuilder/Types/form.types";
import SlidingPaneUtil from "../../../src/Utils/slidingPane.utils";

const Product = () => {
	const [title, setTitle] = useState("This is Title");
	useEffect(() => {
		SlidingPaneUtil.updateProps({ headingTitle: title });
	}, [title]);
	const country_options: SelectOptionType[] = [
		{ value: 1, label: "Nepal" },
		{ value: 2, label: "India" },
		{ value: 3, label: "America" },
	];
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
				isRequired: true,
			},
			{
				name: "password",
				label: "Password",
				type: "password",
				isRequired: true,
				validation: {
					minLength: 10,
					maxLength: 20,
				},
			},
			{
				name: "country",
				label: "Country",
				type: "select",
				options: country_options,
				isRequired: true,
				isMultiple: true,
			},
		],
		layout: "two",
		handleSubmit: (data: any) => {
			console.log({ data });
		},
	};

	return <FormBuilder {...form_props} />;
};

export default Product;
