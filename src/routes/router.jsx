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
import DashboardHome from "../pages/Dashboard/home/DashboardHome";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import AllArticles from "../pages/AllArticle/AllArticles";
import SubscriptionSection from "../pages/Subscription/SubscriptionSection";
import Payment from "../pages/Payment/Payment";
import PremiumArticles from "../pages/PremiumArticle/PremiumArticles";
import MyArticles from "../pages/MyArticles/MyArticles";
import ArticleDetails from "../pages/MyArticles/ArticleDetails";
import UpdateArticle from "../pages/MyArticles/UpdateArticle";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminAllArtcile from "../pages/Dashboard/AdminAllArticle/AdminAllArtcile";
import UserProfile from "../pages/UserProfile/UserProfile";
import Forbidden from "../components/Forbidden";
import AdminRoute from "../provider/AdminRoute";

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
        path: 'forbidden',
        element: <Forbidden></Forbidden>
      },

      {
        path: "add-articles",
        element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>,
      },

      {
        path: "all-articles",
        element: <AllArticles></AllArticles>,
      },

      {
        path: "subscription",
        element: <PrivateRoute><SubscriptionSection></SubscriptionSection></PrivateRoute>,
      },
      {
        path: "payment/:email",
        element: <Payment></Payment>,
      },
      {
        path: "premium-article",
        element: <PrivateRoute><PremiumArticles></PremiumArticles></PrivateRoute>,
      },
      {
        path: "my-articles",
        element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>,
      },
      {
        path: "/articles/:id",
        element: <PrivateRoute><ArticleDetails></ArticleDetails></PrivateRoute>,
      },
      {
        path: "/update-article/:id",
        element: <UpdateArticle></UpdateArticle>,
      },
      {
        path: '/user-profile',
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>,
      }

      
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
        element: <AdminRoute><DashboardHome></DashboardHome></AdminRoute>,
      },
      {
        path: "add-publishers",
        element: <AdminRoute><AddPublisher></AddPublisher></AdminRoute>,
      },
      {
        path: "all-users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
      },
      {
        path: "admin-all-articles",
        element: <AdminRoute><AdminAllArtcile></AdminAllArtcile></AdminRoute>,
      }

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
