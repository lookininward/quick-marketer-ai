import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export const searchBarFormSchema = z.object({
    searchText: z
        .string()
        .max(50, { message: "Max 50 characters" })
});

function SearchBar({ onSearch }: { onSearch: (searchText: string) => void }) {
    const form = useForm({
        resolver: zodResolver(searchBarFormSchema),
        defaultValues: {
            searchText: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(({ searchText }) => onSearch(searchText))}
                className='flex flex-row gap-x-2'
            >
                <FormItem>
                    <FormField
                        control={form.control}
                        name="searchText"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Controller
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                placeholder="Search"
                                                type="text"
                                                className="w-[300px]"
                                            />
                                        )}
                                        name={field.name}
                                        control={form.control}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </FormItem>

                <Button
                    type="submit"
                    className="w-full"
                >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                </Button>
            </form>
        </Form>
    )
}

export default SearchBar