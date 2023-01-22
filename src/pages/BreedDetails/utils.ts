import { TableValue } from "./models";

const capitalize = (word: string) => {
  if (!word) return "";
  return word.replace(
    /(^|_)(\w)/g,
    ($0, $1, $2) => ($1 && " ") + $2.toUpperCase()
  );
};

const getValue = (value: TableValue) => {
  if (typeof value === "object")
    return `imperial: ${value?.imperial}, metric: ${value?.metric}`;
  if (value.length > 50) return value.substring(0, 50);
  return value;
};

const getTitle = (value: TableValue) => {
  return typeof value === "string" && value.length > 50 ? value : "";
};

const isUrl = (key: string, value: TableValue) => {
  return key.includes("url") && typeof value === "string";
};

const clickableText = (key: string, value: TableValue) =>
  isUrl(key, value) ? "hover:underline cursor-pointer" : "no-underline";

const dynamicNumberArray = (count: number) => {
  return Array(Number(count))
    .fill(undefined)
    .map((_, i) => i);
};

export {
  capitalize,
  dynamicNumberArray,
  getValue,
  getTitle,
  clickableText,
  isUrl
};
