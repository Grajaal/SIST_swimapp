import { Prisma } from "@prisma/client";

export type SwimmerWithUser = Prisma.SwimmerGetPayload<{ include: { user: true; data: true } }>;


export type GroupWithSwimmer = Prisma.GroupGetPayload<{
  include: {
    swimmers: {
      include: {
        user: true;
        data: true;
      }
    }
  }
}>;