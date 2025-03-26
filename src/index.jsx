import { createRoot } from "react-dom/client";
import "./index.css";

import HomePag from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetail, { loader as vanDetailLoader } from "./pages/vans/VanDetail";

import Layout from "./components/Layout";
import Dashboard, { loader as dashboarLoader } from "./pages/host/Dashboard";
import Reviews from "./pages/host/Reviews";
import Income from "./pages/host/Income";
import HostLayout from "./components/HostLayout";
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans";
import HostVanDetail, {
  loader as hostVanDetailLoader,
} from "./pages/host/HostVanDetail";
import HostVanPricing from "./pages/host/HostVanPricing";
import HostVanPhoto from "./pages/host/HostVanPhoto";
import HostVanInfo from "./pages/host/HostVanInfo";
import NotFound from "./pages/NotFound";
import ErrorComponent from "./components/Error";
import Login, { action as loginAction } from "./pages/Login";
import { requireAuth } from "./utils";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePag />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<ErrorComponent />}
      />
      <Route
        path="vans/:id"
        element={<VanDetail />}
        loader={vanDetailLoader}
        errorElement={<ErrorComponent />}
      />
      <Route path="host" element={<HostLayout />}>
        <Route index element={<Dashboard />} loader={dashboarLoader} />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<ErrorComponent />}
        />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<ErrorComponent />}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => await requireAuth(request)}
          />
          <Route
            path="photos"
            element={<HostVanPhoto />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
// eslint-disable-next-line react-refresh/only-export-components
function App() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    // </Suspense>
    <RouterProvider router={router} />
  );
}
createRoot(document.getElementById("root")).render(<App />);
