import { useId } from "react";

import { TableProps, TableValue } from "./models";
import Rating from "./Rating";
import {
  capitalize,
  clickableText,
  dynamicNumberArray,
  getTitle,
  getValue,
  isUrl
} from "./utils";

export default function BreedTable({ data }: TableProps) {
  const id = useId();

  const handleTableValueClick = (key: string, value: TableValue) => () => {
    if (isUrl(key, value)) window.open(value as any, "_blank");
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          {Object.entries(data).map(([key, value]) => {
            const trClickableText = clickableText(key, value);
            return (
              <tr
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${trClickableText}`}
                key={`${key}-${id}`}>
                <th
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  scope="row">
                  {capitalize(key)}
                </th>
                <td
                  className={`px-6 py-4 `}
                  onClick={handleTableValueClick(key, value)}
                  title={getTitle(value)}>
                  {dynamicNumberArray(6).includes(value) ? (
                    <Rating count={value} />
                  ) : (
                    getValue(value)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
