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
import CalendarPage from "@/pages/CalendarPage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/calendar", element: <CalendarPage/> },
      { path: "/jobposting", element: <JobPostingPage /> },
      { path: "/jobposting/:id", element: <JobPostingDetailPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
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
