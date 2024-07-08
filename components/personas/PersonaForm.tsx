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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Education } from "@/types/persona";
import { useCreatePersona } from "@/query-api/mutations/useCreatePersona";
import { useDeletePersona } from "@/query-api/mutations/useDeletePersona";
import { useUpdatePersona } from "@/query-api/mutations/useUpdatePersona";

export const createPersonaFormSchema = z.object({
    name: z.string()
        .min(3, { message: "Must be at least 3 characters" })
        .max(100, { message: "Must be at most 100 characters" }),
    age: z.number().int()
        .min(1, { message: "Must be greater than 1" })
        .max(120, { message: "Must be less than 120" })
        .optional(),
    // cm
    height: z.number().int()
        .min(1, { message: "Must be greater than 1" })
        .max(250, { message: "Must be less than 250" })
        .optional(),
    // kg
    weight: z.number().int()
        .min(1, { message: "Must be greater than 1" })
        .max(250, { message: "Must be less than 250" })
        .optional(),
    description: z.string()
        .min(3, { message: "Must be at least 3 characters" })
        .max(250, { message: "Must be at most 250 characters" }),
    education: z.nativeEnum(Education).optional().nullable(),
    occupation: z.string().optional(),
    location: z.string().optional(),
    relationship: z.string().optional(),
    // USD
    income: z.number().int().optional(),
    // image: z.string().optional(),
});

function PersonaForm({
    onSuccess,
    persona,
}: {
    onSuccess: () => void;
    persona?: Persona | null;
}) {
    const form = useForm({
        resolver: zodResolver(createPersonaFormSchema),
        defaultValues: {
            name: '',
            age: 18,
            height: 120,
            weight: 120,
            description: '',
            education: null,
            occupation: '',
            location: '',
            relationship: '',
            income: 0,
            // image: '',
        },
    });

    const { mutate: createPersona, isError, error } = useCreatePersona();
    const { mutate: deletePersona } = useDeletePersona();
    const { mutate: updatePersona } = useUpdatePersona();
    async function onSubmit(values: z.infer<typeof createPersonaFormSchema>) {
        try {
            const isUpdate = !!persona?.id;
            const personaData = {
                ...(isUpdate && { id: persona.id }),
                name: values.name,
                age: values.age,
                height: values.height,
                weight: values.weight,
                description: values.description,
                education: values.education,
                occupation: values.occupation,
                location: values.location,
                relationship: values.relationship,
                income: values.income,
                // image: values.image
            } as Persona;

            if (!isUpdate) {
                await createPersona(personaData);
            } else {
                await updatePersona(personaData);
            }

            if (onSuccess) onSuccess();
        } catch (e) {
            console.error('fail: onSubmit', e);
        }
    }

    const [isAdvancedMode, setIsAdvancedMode] = useState(false);

    const onDelete = async () => {
        try {
            if (!persona) return;
            await deletePersona(persona.id);
            if (onSuccess) onSuccess();
        } catch (e) {
            console.error('fail: onDelete', e);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1 overflow-y-scroll h-full">
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

                {/* Age, Height, Weight */}
                <div className="flex gap-x-4">
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="age"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                className="w-full"
                                                disabled={false}
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Height</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="height"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                className="w-full"
                                                disabled={false}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight</FormLabel>
                                <FormControl>
                                    <Controller
                                        name="weight"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                className="w-full"
                                                disabled={false}
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            />
                                        )}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
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
                    type="button"
                    variant="link"
                    onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                    className="w-full mb-2 gap-x-1"
                    disabled={false}
                >
                    <PlusIcon className="h-4 w-4" /> Advanced
                </Button>

                {isAdvancedMode && (
                    <>


                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Education</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="education"
                                            control={form.control}
                                            render={({ field }) => (
                                                // select
                                                <Select onValueChange={field.onChange}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a level of education" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="elementary">
                                                            High School
                                                        </SelectItem>
                                                        <SelectItem value="highschool">
                                                            College
                                                        </SelectItem>
                                                        <SelectItem value="college">
                                                            Masters
                                                        </SelectItem>
                                                        <SelectItem value="masters">
                                                            Doctorate
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Occupation</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="occupation"
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
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="location"
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
                            name="relationship"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Relationship</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="relationship"
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
                            name="income"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Income</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="income"
                                            control={form.control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    className="w-full"
                                                    disabled={false}
                                                    type="number"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        {/* <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="image"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        /> */}

                    </>
                )}

                <div className="flex gap-x-2">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={false}
                    >
                        Create Persona
                    </Button>

                    {persona && (
                        <Button
                            type="button"
                            variant="destructive"
                            disabled={false}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}

export default PersonaForm;