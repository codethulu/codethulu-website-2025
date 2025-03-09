import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import MainPortfolio from './pages/MainPortfolio';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPortfolio,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});

const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: Projects,
});

const projectPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$projectId",
  component: ProjectPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/404",
  component: NotFound,
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  projectsRoute,
  projectPageRoute,
  notFoundRoute,
  catchAllRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;