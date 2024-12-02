import HomeView from "@/modules/home/HomeView";
import StockView from "@/modules/stock/StockView";
import ProductView from "@/modules/product/ProductView";
import CartView from "@/modules/cart/CartView";
import NotFoundView from "@/modules/not-found/NotFoundView";
import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ManagerView from "@/modules/manager/ManagerView";
import DefaultLayouts from "@/layouts/DefaultLayouts";
import LoginView from "@/modules/auth/LoginView";
import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader } from "lucide-react";
// import AddNewProductView from "@/modules/product/AddNewProductView";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "@/layouts/AuthLayout";
const router = createBrowserRouter([
	{
	  path: "/",
	  element: <DefaultLayouts />,
	  children: [
		{
		  path: "",
		  element: (
			<ProtectedRoute requiredRole="Admin">
			  <HomeView />
			</ProtectedRoute>
		  ),
		},
		{
		  path: "/product",
		  element: (
			<ProtectedRoute requiredRole="user">
			  <ProductView />
			</ProtectedRoute>
		  ),
		},
		{
		  path: "/addProduct",
		  element: (
			<ProtectedRoute requiredRole="Admin">
			  <StockView />
			</ProtectedRoute>
		  ),
		},
		{
		  path: "/cart",
		  element: (
			<ProtectedRoute requiredRole="user">
			  <CartView />
			</ProtectedRoute>
		  ),
		},
		{
		  path: "/manager",
		  element: (
			<ProtectedRoute requiredRole="Admin">
			  <ManagerView />
			</ProtectedRoute>
		  ),
		},
	  ],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
	{
	  path: "*",
	  element: <NotFoundView />,
	},
  ]);

const Wrapper = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* <Loader/> */}
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
};
export default Wrapper;
