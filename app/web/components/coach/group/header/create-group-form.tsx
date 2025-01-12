"use client";

import { Input } from "@/components/ui/input";
import { SwimmerWithUser } from "@/prisma/custom";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreateGroupSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createGroup } from "@/actions/group";
import { FormError } from "@/components/form-error";
import { useState } from "react";

export function CreateGroupForm({
  teamId,
  swimmers,
}: {
  teamId: string;
  swimmers: SwimmerWithUser[];
}) {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof CreateGroupSchema>>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      groupName: "",
      swimmers: [],
    },
  });

  const multiselectSwimmers = swimmers.map((swimmer) => {
    const value = swimmer.user.name || "";
    const label = swimmer.user.name || "";

    return {
      value,
      label,
    };
  });

  const onSubmit = (values: z.infer<typeof CreateGroupSchema>) => {
    setError("");
    const { groupName, swimmers } = values;

    createGroup(teamId, groupName, swimmers).then((data) => {
      if (data?.error) {
        setError(data.error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del grupo</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Velocistas" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="swimmers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nadadores</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={multiselectSwimmers}
                    onValueChange={field.onChange}
                    placeholder="Selecciona a los nadadores"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit">Crear grupo</Button>
        </div>
      </form>
    </Form>
  );
}
