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
    SelectGroup,
} from "@/components/ui/select"
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

export const createPersonaFormSchema = z.object({
    name: z.string().max(50, { message: "Name must be at most 50 characters" }),
    description: z.string().max(250, { message: "Description must be at most 250 characters" }),
    age: z.number().int().min(0).max(120).optional(),
    height: z.string().optional(),
    weight: z.string().optional(),
    education: z.string().optional(),
    occupation: z.string().optional(),
    location: z.string().optional(),
    relationship: z.string().optional(),
    income: z.string().optional(),
    hobbies: z.string().optional(),
    interests: z.string().optional(),
    values: z.string().optional(),
    goals: z.string().optional(),
    challenges: z.string().optional(),
    fears: z.string().optional(),
    personality: z.string().optional(),
    background: z.string().optional(),
    image: z.string().optional(),
});

function PersonaForm() {
    const form = useForm({
        resolver: zodResolver(createPersonaFormSchema),
        defaultValues: {
            name: '',
            description: '',
            age: 0,
            height: '',
            weight: '',
            education: '',
            occupation: '',
            location: '',
            relationship: '',
            income: '',
            hobbies: '',
            interests: '',
            values: '',
            goals: '',
            challenges: '',
            fears: '',
            personality: '',
            background: '',
            image: '',
        },
    });

    function onSubmit(values: z.infer<typeof createPersonaFormSchema>) {
        console.log(values);
    }

    const [isAdvancedMode, setIsAdvancedMode] = useState(false);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1 overflow-y-scroll h-screen">
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

                        <FormField
                            control={form.control}
                            name="hobbies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hobbies</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="hobbies"
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
                            name="interests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Interests</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="interests"
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
                            name="values"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Values</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="values"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        <FormField
                            control={form.control}
                            name="goals"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Goals</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="goals"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />


                        <FormField
                            control={form.control}
                            name="challenges"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Challenges</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="challenges"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        <FormField
                            control={form.control}
                            name="fears"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fears</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="fears"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        <FormField
                            control={form.control}
                            name="personality"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Personality</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="personality"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        <FormField
                            control={form.control}
                            name="background"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background</FormLabel>
                                    <FormControl>
                                        <Controller
                                            name="background"
                                            control={form.control}
                                            render={({ field }) => (
                                                <input {...field} className="w-full" disabled={false} />
                                            )}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}

                        />

                        <FormField
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

                        />

                    </>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={false}
                >
                    Create Persona
                </Button>
            </form>
        </Form>
    );
}

export default PersonaForm;