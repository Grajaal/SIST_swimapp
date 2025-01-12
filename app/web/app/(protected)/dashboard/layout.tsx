import CoachHeader from "@/components/coach/header/coach-header";
import { CoachSidebar } from "@/components/coach/sidebar/coach-sidebar";
import { SwimmerNavbar } from "@/components/swimmer/swimmer-navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

export default async function DasboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSession = await currentUser();

  if (
    !userSession ||
    !userSession.id ||
    !userSession.name ||
    !userSession.email
  ) {
    redirect("/auth/login");
  }

  const user = {
    name: userSession.name,
    email: userSession.email,
    avatar: userSession.image || "",
  };

  if (userSession.role === Role.coach) {
    return (
      <SidebarProvider>
        <CoachSidebar user={user} />
        <SidebarInset>
          <CoachHeader />
          <div className="flex flex-col h-screen]">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <div className="p-2">
      <SwimmerNavbar />
      {children}
    </div>
  );
}
