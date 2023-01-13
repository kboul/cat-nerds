import Breed from "./breed";

export default interface CatImage {
  breeds: Breed[];
  height: number;
  id: string;
  url: string;
  width: number;
}
