import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const PDFViewer = lazy(() => import("../pages/PDFViewer"));

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/:pdfName",
    Component: PDFViewer,
  },
]);

export default Routes;
