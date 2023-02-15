import { SelectBoxType } from "../../../../Components/SelectBox/selecBox.component";

export interface ValidationInterface {
	minLength?: number;
	maxLength?: number;
	isRequired?: number;
	pattern?: string;
}

export type SchemaBaseType = {
	label: string;
	name: string;
	isRequired?: boolean;
	validation?: ValidationInterface;
	className?: string;
};

export type SchemaInputType = SchemaBaseType & {
	type: "text" | "number" | "password" | "email" | "checkbox" | "textarea";
};

export type SelectSchemaType = SchemaBaseType & {
	type: "select" | "radio";
} & SelectBoxType;

export type SchemaType = SchemaInputType | SelectSchemaType;

export interface FormInterface {
	fields: SchemaType[];
	onSubmit?: (data?: any) => void;
	data?: any;
	className?: string;
	layout?: "one" | "two" | "three";
	handleSubmit?: any;
	realTimeValidate?: boolean;
}
