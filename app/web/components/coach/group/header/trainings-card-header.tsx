import { CardHeader, CardTitle } from "@/components/ui/card";
import { CreateGroupDialog } from "@/components/coach/group/header/create-group-dialog";
import { DatePicker } from "@/components/coach/group/header/date-picker";

export function TrainingsCardHeader() {
  return (
    <CardHeader>
      <div className="flex justify-between">
        <div className="flex space-x-4 items-center">
          <CardTitle>Entrenamientos</CardTitle>
          <DatePicker />
        </div>
        <div className="flex space-x-2 items-center">
          <CreateGroupDialog />
        </div>
      </div>
    </CardHeader>
  );
}
