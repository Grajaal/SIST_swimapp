import React from "react";

interface AuthLayoutProps {
children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
return (
    <div
    className="h-full flex items-center justify-center 
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
    >
    {children}
    </div>
);
}
