import { ReactNode } from "react";
import  useAuth  from "@/hooks/useAuth"; // Assuming the useAuth hook is in the hooks folder
import { Store, Home, ShoppingBasket, LibraryIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";

interface AppSidebarProps {
  className?: string;
  userRole: string | null;
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Stock",
    url: "product",
    icon: Store,
    role: "user",
  },
  {
    title: "Stock Page",
    url: "addProduct",
    icon: Store,
    role: "Admin",
  },
  {
    title: "Cart",
    url: "cart",
    icon: ShoppingBasket,
    role: "user",
  },
  {
    title: "Sale Report",
    url: "manager",
    icon: LibraryIcon,
    role: "Admin",
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({ className, userRole }) => {
  return (
    <div className={`bg-[#012a4a] text-[#cae9ff] ${className}`}>
      <Sidebar className="my-20">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items
                  .filter((item) => !item.role || item.role === userRole)
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
export default AppSidebar;