"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Users, FileText, PlusCircle } from 'lucide-react';
import type { AgendaItem, AgendaItemIcon } from '@/app/types';

type AgendaFormProps = {
  onAddItem: (item: Omit<AgendaItem, 'id' | 'status'>) => void;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100, "Title is too long."),
  description: z.string().min(1, "Description is required.").max(500, "Description is too long."),
  owner: z.string().min(1, "Owner is required.").max(50, "Owner name is too long."),
  icon: z.enum(['Briefcase', 'Users', 'FileText']),
});

const iconOptions: { value: AgendaItemIcon; label: string; icon: React.ReactNode }[] = [
  { value: 'Briefcase', label: 'Business', icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { value: 'Users', label: 'Team', icon: <Users className="h-4 w-4 mr-2" /> },
  { value: 'FileText', label: 'Document', icon: <FileText className="h-4 w-4 mr-2" /> },
];

export default function AgendaForm({ onAddItem }: AgendaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      owner: "",
      icon: "Briefcase",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddItem(values);
    form.reset();
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <PlusCircle className="text-primary"/>
          Add New Agenda Item
        </CardTitle>
        <CardDescription>Fill in the details to add a new item to your agenda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Q3 Strategy Review" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the agenda item..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Icon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center">
                            {option.icon}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" size="lg">Add Item</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
