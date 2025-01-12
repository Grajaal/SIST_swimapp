"use client";

import { GroupItem } from "@/components/coach/group/group-item";
import { GroupWithSwimmer } from "@/prisma/custom";
import { Group } from "@prisma/client";

export function GroupsContainer({ groups }: { groups: Group[] }) {
  return (
    <>
      {groups.length > 0 ? (
        <div className="space-y-4 w-full">
          {groups.map((group) => (
            <GroupItem key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <span className="text-3xl text-muted-foreground">No hay grupos</span>
        </div>
      )}
    </>
  );
}
