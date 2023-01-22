import { useId } from "react";

import { CatBreed } from "../../models";
import { Weight } from "../../models/catBreed";

interface TableProps {
  data: CatBreed;
}

type TableValue = string | Weight;

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

export default function BreedTable({ data }: TableProps) {
  const id = useId();
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={`${key}-${id}`}>
                <th
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  scope="row">
                  {capitalize(key)}
                </th>
                <td className="px-6 py-4" title={getTitle(value)}>
                  {getValue(value as TableValue)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
