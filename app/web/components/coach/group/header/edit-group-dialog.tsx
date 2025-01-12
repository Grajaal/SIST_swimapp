import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Pencil } from "lucide-react";
import { Group } from "@prisma/client";

export function EditGroupDialog({ group }: { group: Group }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar grupo</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
