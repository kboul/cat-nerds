import { Breed } from "./breed";

export default interface Image {
  breeds: Breed[] | [];
  height: number;
  id: string;
  url: string;
  width: number;
}
