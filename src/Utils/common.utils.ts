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
