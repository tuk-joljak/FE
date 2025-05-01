import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "@/pages/MainPage";
// import RecruitPage from "@/pages/RecruitPage";
// import RecruitDetailPage from "@/pages/RecruitDetailPage";
import BoardPage from "@/pages/BoradPage";
import ResumePage from "@/pages/ResumePage";
import ErrorPage from "@/pages/ErrorPage";
import JobPostingPage from "@/pages/JobPostingPage";
import JobPostingDetailPage from "@/pages/JobPostingDetailPage";
import { StudyGroupPage } from "@/pages/StudyGroupPage";
import StudyGroupDetailPage from "@/pages/StudyGroupDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      // {
      //   path: "/recruit",
      //   element: <RecruitPage />,
      // },
      // { path: "/:id", element: <RecruitDetailPage /> },
      { path: "/board", element: <BoardPage /> },
      {
        path: "/resume",
        element: <ResumePage />,
      },
      { path: "board", element: <BoardPage /> },
      { path: "resume", element: <ResumePage /> },
      {
        path: "study-group",
        children: [
          { index: true, element: <StudyGroupPage /> },
          { path: ":id", element: <StudyGroupDetailPage /> },
        ],
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);
