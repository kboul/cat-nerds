import { useParams } from "react-router-dom";

export default function BreedDetails() {
  const { breedDetailsId } = useParams();
  console.log(breedDetailsId);
  return <div>BreedDetails</div>;
}
