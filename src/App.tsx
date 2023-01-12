import { QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import { CatBreeds, FavouriteCats, NoMatch, RandomCatImages } from "./pages";
import { queryClient } from "./queryClient";
import { routes } from "./routes";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Navbar />}>
          <Route
            index
            path={routes.randomCatImages.path}
            element={<RandomCatImages />}
          />
          <Route path={routes.catBreeds.path} element={<CatBreeds />} />
          <Route path={routes.favouriteCats.path} element={<FavouriteCats />} />

          <Route
            path="/"
            element={<Navigate to={routes.randomCatImages.path} replace />}
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
