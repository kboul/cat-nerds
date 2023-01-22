import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes } from "react-router-dom";

import { CatBreedModal, CatImageModal, Navbar } from "./components";
import {
  BreedDetails,
  CatBreeds,
  CatImages,
  FavouriteCats,
  NoMatch
} from "./pages";
import { queryClient } from "./queryClient";
import { routes } from "./routes";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Navbar />}>
          <Route path={routes.catImages.path} element={<CatImages />}>
            <Route path=":catImageId" element={<CatImageModal />} />
          </Route>
          <Route path={routes.catBreeds.path} element={<CatBreeds />}>
            <Route path=":catBreedId" element={<CatBreedModal />} />
          </Route>
          <Route path={routes.breedDetails.path}>
            <Route path=":breedId" element={<BreedDetails />} />
          </Route>
          <Route path={routes.favouriteCats.path} element={<FavouriteCats />} />

          <Route
            path="/"
            element={<Navigate to={routes.catImages.path} replace />}
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
