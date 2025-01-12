"use client";

import { GroupWithSwimmer } from "@/prisma/custom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizonal, Trash2 } from "lucide-react";
import { deleteGroup } from "@/data/group";
import { EditGroupDialog } from "@/components/coach/group/header/edit-group-dialog";
import { createTraining } from "@/actions/training";
import { useDate } from "@/context/date-context";
import { Group } from "@prisma/client";

export function GroupItem({ group }: { group: Group }) {
  const { date } = useDate();

  const handleDeleteGroup = async () => {
    await deleteGroup(group.id);
  };

  const handleSendTraining = async (formData: FormData) => {
    if (!date) return;
    await createTraining(group.id, date, formData);
  };

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>{group.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={handleSendTraining}
          className="flex space-x-2 justify-between"
        >
          <div className="flex space-x-2 w-auto">
            <Input
              name="meters"
              placeholder="Metros recorridos"
              type="number"
            />
            <Input name="minutes" placeholder="Minutos" type="number" />
          </div>
          <div className="flex space-x-2">
            <EditGroupDialog group={group} />
            <Button variant="outline" size="icon" onClick={handleDeleteGroup}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
            <Button type="submit" size="icon">
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
