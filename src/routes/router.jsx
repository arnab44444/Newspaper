import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/Authlayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/Dashboardlayout";
import PrivateRoute from "../provider/PrivateRoute";
import ErrorPage from "../components/ErrorPage";
import AddArticle from "../pages/AddArticle/AddArticle";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AddPublisher from "../pages/AddPublisher/AddPublisher";
import AllArticles from "../pages/AllArticle/AllArticles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,

    children: [
      {
        //path: '',
        index: true,

        // loader: () => fetch("https://restuarent-server-sepia.vercel.app/top-purchased-foods"),
        // hydrateFallbackElement: (
        //   <span className="loading loading-bars loading-xl"></span>
        // ),
        element: <Home></Home>,
      },

      {
        path: "add-articles",
        element: <AddArticle></AddArticle>,
      },

      {
        path: "all-articles",
        element: <AllArticles></AllArticles>,
      },

      //   {
      //     path: "addFood",
      //     element: <AddFood></AddFood>,
      //   },

      //   {
      //     path: "allFood",

      //     loader: () => fetch("https://restuarent-server-sepia.vercel.app/foods"),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: <AllFoods></AllFoods>,
      //   },

      //   {
      //     path: "/foodDetails/:id",
      //     loader: ({ params }) =>
      //       fetch(`https://restuarent-server-sepia.vercel.app/foodDetails/${params.id}`),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: (
      //       <PrivateRoute>
      //         <FoodDetails></FoodDetails>
      //       </PrivateRoute>
      //     ),
      //   },

      //   {
      //     path: "/foodPurchase/:id",
      //     loader: ({ params }) =>
      //       fetch(`https://restuarent-server-sepia.vercel.app/foodPurchase/${params.id}`),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: (
      //       <PrivateRoute>
      //         <FoodPurchase></FoodPurchase>
      //       </PrivateRoute>
      //     ),
      //   },

      //   {
      //     path: "/my-food",
      //     //path: 'my-orders/:email',
      //     //   loader: ({ params }) => fetch(`https://library-server-self-theta.vercel.app/my-orders/${params.email}`),
      //     // hydrateFallbackElement: (
      //     //   <span className="loading loading-bars loading-xl"></span>
      //     // ),
      //     element: (
      //       <PrivateRoute>
      //         <MyFood></MyFood>
      //       </PrivateRoute>
      //     ),
      //   },

      //   {
      //     path: "/updateFood/:id",
      //     loader: ({ params }) =>
      //       fetch(`https://restuarent-server-sepia.vercel.app/updateFood/${params.id}`),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: <UpdateFood></UpdateFood>,
      //   },

      //   {
      //     path: "/myFood-post",
      //     element: (
      //       <PrivateRoute>
      //         <MyPost></MyPost>
      //       </PrivateRoute>
      //     ),
      //   },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },

      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // Default route for /dashboard
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "add-publishers",
        element: <AddPublisher></AddPublisher>,
      },

      //   {
      //     path: "add-plants",
      //     element: <AddPlants></AddPlants>,
      //   },
      //   {
      //     path: "update-profile",
      //     element: <UpdateProfile></UpdateProfile>,
      //   },

      //   {
      //     path: "my-plants/:email",
      //     loader: ({ params }) =>
      //       fetch(
      //         `https://plant-tracker-server.vercel.app/plants/${params.email}`
      //       ),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: <MyPlants />,
      //   },

      //   {
      //     path: "all-plants",
      //     loader: () => fetch("https://plant-tracker-server.vercel.app/plants"),
      //     hydrateFallbackElement: (
      //       <span className="loading loading-bars loading-xl"></span>
      //     ),
      //     element: <AllPlantDash></AllPlantDash>,
      //   },
    ],
  },

  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;

// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
