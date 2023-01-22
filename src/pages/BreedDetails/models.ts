import { CatBreed, Weight } from "../../models";

interface TableProps {
  data: CatBreed;
}

type TableValue = string | Weight;

export type { TableProps, TableValue };
