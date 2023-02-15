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
	validations?: ValidationInterface;
	className?: string;
};

type SelectOptionType = {
	label: string;
	value: string;
	data?: any;
};

export type SchemaInputType = SchemaBaseType & {
	type: "text" | "number" | "password" | "email" | "checkbox" | "textarea";
};

export type SelectSchemaType = SchemaBaseType & {
	type: "select" | "radio";
	options: SelectOptionType[];
	clear?: boolean;
	radio_type?: string;
};

export type SchemaType = SchemaInputType | SelectSchemaType;

export interface FormInterface {
	fields: SchemaType[];
	onSubmit?: (data?: any) => void;
	data?: any;
	className?: string;
	layout?: "one" | "two" | "three";
}
