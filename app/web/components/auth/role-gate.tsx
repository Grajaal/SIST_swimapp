import { Role } from "@prisma/client";
import { FormError } from "@/components/form-error";
import { currentRole } from "@/lib/auth";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: Role;
}

export async function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = await currentRole();

  if (role !== allowedRole) {
    return <FormError message="No tienes permiso para ver este contenido." />;
  }

  return <>{children}</>;
}
