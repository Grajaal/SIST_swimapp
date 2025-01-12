"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SwimmerDataSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSwimmerData } from "@/actions/swimmer-data";
import { CompletedForm } from "./completed-form";
import { useState } from "react";

export function DataForm() {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);

  const form = useForm<z.infer<typeof SwimmerDataSchema>>({
    resolver: zodResolver(SwimmerDataSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof SwimmerDataSchema>) => {
    createSwimmerData(values).then((data) => {
      if (data.success) {
        setIsCompleted(true);
      }
    });
  };

  if (isCompleted) {
    return <CompletedForm />;
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <h2 className="font-bold">Completa tus variables!</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="sleepHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horas de sueño</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sleepQuality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calidad de sueño</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>1: Mala, 10: Buena</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fatigue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fatiga</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>1: Leve, 10: Agudo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="musclePain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dolor muscular</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>1: Leve, 10: Agudo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estrés</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormDescription>1: Leve, 10: Agudo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
