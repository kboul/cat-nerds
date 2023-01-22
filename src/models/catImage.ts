import { CatBreed } from "./catBreed";

export default interface CatImage {
  breeds: CatBreed[] | [];
  height: number;
  id: string;
  url: string;
  width: number;
}
