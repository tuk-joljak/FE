import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import MainPage from "@/pages/MainPage";
// import RecruitPage from "@/pages/RecruitPage";
// import RecruitDetailPage from "@/pages/RecruitDetailPage";
import BoardPage from "@/pages/BoradPage";
import ResumePage from "@/pages/ResumePage";
import CalendarPage from "@/pages/CalendarPage";

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
      { path: "/calendar", element: <CalendarPage /> }
    ],
  },
]);
