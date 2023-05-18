import { DISPLAY_DATE_FORMAT } from "@Constants/date.constant";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const EmptyFunction = () => {
  //empty function
};

export const getUuid4 = () => {
  let myuuid = uuidv4();
  return myuuid;
};

export const resolveNavigation = (path: string) => {
  return `/${path}`;
};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
  return (...args: any) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

export const GetObjectFromArray = (arr: any[], key: string, value: any) => {
  for (let element of arr) {
    if (element[key] === value) {
      return element;
    }
  }
  return {};
};

export const IsEmptyObject = (obj: any) => {
  if (typeof obj === "object") {
    return !!Object.values(obj).length;
  }
  return false;
};

export const Capitalize = (str: string = "") => {
  if (!str) return str;
  const firstElement = str[0];
  return `${firstElement.toUpperCase()}${str.slice(1, str?.length)}`;
};

export const IsArray = (arr: any) => {
  return Array.isArray(arr);
};

export const IsUniqueArray = (array: string[] | number[]) => {
  const exist_elements: any[] = [];
  for (let arr of array) {
    if (!exist_elements.includes(arr)) exist_elements.push(arr);
  }
  return exist_elements?.length === array?.length;
};

export const IsUniqueArrayObject = (array: any[], key: string) => {
  if (!IsArray(array)) return false;
  return IsUniqueArray(array.map((element) => element[key]));
};

export const IsFunction = (value: any) => {
  if (!value) return false;
  return typeof value === "function";
};
export const IsUndefined = (value: any) => {
  return typeof value === "undefined";
};

export const IsUndefinedOrNull = (value: any) => {
  if (IsUndefined(value)) return true;
  return value === null;
};

export const GetDateValue = (value: string) => {
  return new Date(value);
};

export const FormatDisplayDate = (value: any) => {
  if (!value) return value;
  return format(GetDateValue(value), DISPLAY_DATE_FORMAT);
};

export const GetObjectPrefixValue = (obj: any = {}, key: string) => {
  const keys = key.split(".");

  const lastKey = keys.pop();
  if (!lastKey) return null;
  if (!keys?.length) return obj[lastKey];
  let pointer = keys.reduce((acc: any, key: string) => {
    const value = acc[key];

    if (IsUndefinedOrNull(value)) {
      return {};
    }
    return value;
  }, obj);

  return pointer[lastKey];
};
