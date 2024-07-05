'use client';

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input";

export const createTagFormSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be at most 50 characters" }),
    description: z.string()
        .max(250, { message: "Description must be at most 250 characters" })
        .optional(),
});

function TagForm({ tag }: { tag?: Tag }) {
    const form = useForm({
        resolver: zodResolver(createTagFormSchema),
        defaultValues: {
            name: tag ? tag.name : '',
            description: tag ? tag.description : '',
        },
    });

    function onSubmit(values: z.infer<typeof createTagFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Controller
                                    name="name"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className="w-full"
                                            disabled={false}
                                        />
                                    )}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Controller
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Textarea {...field} className="w-full" disabled={false} />
                                    )}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={false}
                >
                    {tag ? 'Update Tag' : 'Create Tag'}
                </Button>
            </form>
        </Form>
    );
}

export default TagForm;