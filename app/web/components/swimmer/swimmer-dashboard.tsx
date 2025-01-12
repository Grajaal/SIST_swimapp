import { DataForm } from "./data-form";
import { currentUser } from "@/lib/auth";
import { hasCompletedForm } from "@/data/swimmer";
import { CompletedForm } from "./completed-form";

export default async function SwimmerDashboard() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) return <p>Usurio no registrado</p>;

  const isCompleted = await hasCompletedForm(sessionUser.id, new Date());

  return (
    <div className="h-screen flex flex-col p-2">
      <div className="flex-1 flex justify-center items-center">
        {isCompleted ? <CompletedForm /> : <DataForm />}
      </div>
    </div>
  );
}
