import { Breed, Weight } from "../../models";

interface TableProps {
  data: Breed;
}

type TableValue = string | Weight;

export type { TableProps, TableValue };
