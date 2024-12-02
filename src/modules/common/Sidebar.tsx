import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "@/hooks/useAuth"; // Adjust path as per your directory structure
import Cookies from "js-cookie";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string | null>(null);
  const { isAuthenticated } = useAuth(); // Get authentication state
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect if not authenticated
      return;
    }

    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: { [key: string]: any } = jwtDecode(token);
        const role = decoded["role"];
        setUserRole(role);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarTrigger />
      <Outlet />
    </SidebarProvider>
  );
}
