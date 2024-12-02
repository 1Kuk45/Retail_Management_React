import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { XIcon, MenuIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import useAuth from "@/hooks/useAuth"; // Import useAuth hook

const Navbar = () => {
  const { userLogout } = useAuth(); // Get the userLogout function from useAuth
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define the handleLogout function
  const handleLogout = () => {
    userLogout(); // Call userLogout to clear the token and update authentication state
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#014f86] sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-0">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-[#cae9ff]">MyApp</span>
          </div>
          <NavigationMenu className="hidden sm:flex h-full items-center justify-end">
            <NavigationMenuList className="flex space-x-4">
              {/* Logout Link */}
              <NavigationMenuItem>
                <NavLink
                  to="/auth/login" // Navigate to login page after logout
                  onClick={handleLogout} // Trigger userLogout when clicked
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#012a4a] text-[#cae9ff] rounded-md px-3 py-2 text-sm font-medium"
                      : "text-[#cae9ff] hover:bg-[#cae9ff] hover:text-[#012a4a] rounded-md px-3 py-2 text-sm font-medium"
                  }
                >
                  Logout
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-[#cae9ff] hover:bg-[#012a4a] hover:text-white"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
