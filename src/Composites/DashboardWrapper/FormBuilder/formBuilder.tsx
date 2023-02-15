import next from "next";
import { useCallback, useMemo } from "react";
import Button from "../../../Components/Button/button.component";
import InputField, {
	TextareaInput,
} from "../../../Components/Input/inputField.component";
import SelectBox from "../../../Components/SelectBox/selecBox.component";
import useForm from "./Hooks/useForm.hook";
import { FormInterface } from "./Types/form.types";

const FormBuilder = ({
	fields,
	data,
	layout = "one",
	className = "",
}: FormInterface) => {
	const { error, handleFormData, formData, onSubmit } = useForm(fields, data);
	const hasError = useCallback(
		(key: string) => {
			return typeof error[key] !== "undefined";
		},
		[error]
	);

	const handleSubmit = (next: any) => {
		// e.preventDefault();
		onSubmit(next);
	};

	const getSchemaElement = useCallback(
		(field: any) => {
			const { type, name, label, options = [] } = field;
			switch (type) {
				case "select":
					return (
						<SelectBox
							{...field}
							options={options}
							label={label}
							value={formData[name]}
							onChange={(value) => {
								handleFormData(name, value);
							}}
							error={hasError(name)}
							errorMessage={error[name]}
						/>
					);

				case "textarea":
					return (
						<TextareaInput
							label={label}
							value={formData[name]}
							onBlur={(value: any) => handleFormData(name, value)}
							{...field}
							error={hasError(name)}
							errorMessage={error[name]}
						/>
					);
				case "file":
					return <></>; // return file component

				default: // type is text, number
					return (
						<InputField
							type={type}
							label={label}
							value={formData[name]}
							{...field}
							onBlur={(value) => {
								handleFormData(
									name,
									["number"].includes(type) ? +value : value
								);
							}}
							error={hasError(name)}
							errorMessage={error[name]}
						/>
					);
			}
		},
		[error, formData, handleFormData, hasError]
	);
	const renderSchema = useCallback(() => {
		return fields.map((field, index: number) => {
			return (
				<div key={field.name || index} className={field.name}>
					{getSchemaElement(field)}
				</div>
			);
		});
	}, [fields, getSchemaElement]);
	const layoutClass = useMemo(() => {
		let className = `p-4 gap-4 grid`;
		switch (layout) {
			case "two":
				return `${className} grid-cols-2`;
			case "three":
				return `${className} grid-cols-3`;
			default:
				return `${className} grid-cols-1`;
		}
	}, [layout]);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className={className}
		>
			<div className={layoutClass}>
				{renderSchema()}
				<Button onClick={handleSubmit}>Save</Button>
			</div>
		</form>
	);
};

export default FormBuilder;
