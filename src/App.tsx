import { RouterProvider, createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import MainPortfolio from './pages/MainPortfolio.tsx';
import Blog from './pages/Blog.tsx';
import Navbar from './components/Navbar.tsx';

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

const routeTree = rootRoute.addChildren([indexRoute, blogRoute]);
const router = createRouter({ routeTree });

function App() {

  return <RouterProvider router={router} />;
}

export default App;