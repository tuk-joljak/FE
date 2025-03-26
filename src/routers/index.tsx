import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "@/pages/MainPage";
import RecruitPage from "@/pages/RecruitPage";
import RecruitDetailPage from "@/pages/RecruitDetailPage";
import BoardPage from "@/pages/BoradPage";
import ResumePage from "@/pages/ResumePage";
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "recruit",
        children: [
          { index: true, element: <RecruitPage /> },
          { path: ":id", element: <RecruitDetailPage /> },
        ],
      },
      { path: "board", element: <BoardPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
