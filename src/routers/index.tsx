import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "@/pages/MainPage";
import BoardPage from "@/pages/BoradPage";
import ResumePage from "@/pages/ResumePage";
import ErrorPage from "@/pages/ErrorPage";
import JobPostingPage from "@/pages/JobPostingPage";
import JobPostingDetailPage from "@/pages/JobPostingDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: "jobposting",
        children: [
          { index: true, element: <JobPostingPage /> },
          { path: ":id", element: <JobPostingDetailPage /> },
        ],
      },
      { path: "board", element: <BoardPage /> },
      { path: "resume", element: <ResumePage /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
