import Joi from "joi";
import { useMemo, useState } from "react";
import { EmptyFunction } from "../../../../Utils/common.utils";
import { JoiErrorMessageToJson } from "../Utils/joiValidation.utils";

//single validation object get
const getJoiValidation = (
	type: any,
	dispalayLabel: string,
	validation: any
) => {
	let joiValidation: any;
	switch (type) {
		case "number":
			joiValidation = Joi.number();
			break;
		case "email":
			joiValidation = Joi.string().email({ tlds: { allow: false } });
			break;
		default:
			joiValidation = Joi.string();
	}
	const keys = Object.keys(validation);
	// make full validation object
	joiValidation = keys.reduce((prev: any, next: any) => {
		const value: any = validation[next];
		switch (next) {
			case "minLength":
				return prev.min(value);
			case "maxLength":
				return prev.max(value);
			case "isRequired":
				return prev.required(value);
			case "pattern":
				return prev.pattern(new RegExp(value));
			default:
				return prev;
		}
	}, joiValidation);

	joiValidation.label(dispalayLabel);

	return joiValidation;
};

//form schema whole validations generate
const getJoiSchema = (fields: any) => {
	let schema: any = {};
	for (let field of fields) {
		const {
			name,
			label: dispalayLabel,
			isRequired,
			type,
			validation,
		} = field;

		schema[name] = getJoiValidation(type, dispalayLabel, {
			...validation,
			isRequired,
		});
	}
	return Joi.object({ ...schema });
};

const useForm = (schema: any, data: any = {}) => {
	const [error, setError] = useState<any>({});
	const [formData, setFormData] = useState<any>(data);

	const validationSchema = useMemo(() => {
		return getJoiSchema(schema);
	}, [schema]);
	const verify = (key: any = null) => {
		const { error: err } = validationSchema.validate(
			key ? { [key]: formData[key] } : formData
		);
		if (err) {
			setError(JoiErrorMessageToJson(err));
			return false;
		}
		setError({});
		return true;
	};

	const handleFormData = (key: string, value: any) => {
		setFormData((prev: any) => {
			return {
				...prev,
				[key]: value,
			};
		});
	};

	const onSubmit = (next: any = EmptyFunction) => {
		const isValid = verify();
		if (!isValid) {
		}
		next();
	};

	return {
		handleFormData,
		error,
		onSubmit,
		formData,
	};
};

export default useForm;
