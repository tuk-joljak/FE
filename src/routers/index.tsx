import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "@/pages/MainPage";
import RecruitPage from "@/pages/RecruitPage";
import RecruitDetailPage from "@/pages/RecruitDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      {
        path: "/recruit",
        element: <RecruitPage />,
      },
      { path: "/:id", element: <RecruitDetailPage /> },
    ],
  },
]);
