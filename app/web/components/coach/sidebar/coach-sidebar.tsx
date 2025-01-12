"use client";
import { Home, LogOut, BotMessageSquare, ChartBar } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../../ui/button";
import { LogoutButton } from "../../auth/logout-button";

export function CoachSidebar({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <span className="font-bold text-2xl p-4">🏊🏼 SwimApp</span>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem className="rounded-lg">
            <SidebarMenuButton
              variant={pathname === "/dashboard" ? "outline" : "default"}
              size="lg"
              asChild
            >
              <Link href="/dashboard">
                <div className="inline-flex items-center space-x-2 ml-2">
                  <Home className="w-4 h-4" />
                  <span className="text-lg">Inicio</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="rounded-lg">
            <SidebarMenuButton
              variant={
                pathname === "/dashboard/trainings" ? "outline" : "default"
              }
              size="lg"
              asChild
            >
              <Link href="/dashboard/chat">
                <div className="inline-flex items-center space-x-2 ml-2">
                  <BotMessageSquare className="h-4 w-4" />
                  <span className="text-lg">Asistente</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              variant={
                pathname === "/dashboard/statistics" ? "outline" : "default"
              }
              size="lg"
              asChild
            >
              <Link href="/dashboard/statistics">
                <div className="inline-flex items-center space-x-2 ml-2">
                  <ChartBar className="h-4 w-4" />
                  <span className="text-lg">Estadísticas</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user.name}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LogoutButton>
                <div className="flex items-center">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Cerrar sesión</span>
                </div>
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar >
  );
}
