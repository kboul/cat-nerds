import { useNavigate } from "react-router-dom";

import Modal from "./Modal";
import { routes } from "../routes";

export default function CatBreedModal() {
  const navigate = useNavigate();

  return (
    <Modal
      title="Cat Breed Images"
      onModalClose={() => navigate(`/${routes.catBreeds.path}`)}>
      <div>content</div>
    </Modal>
  );
}
