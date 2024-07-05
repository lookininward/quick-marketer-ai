import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { products, personas, platforms, MAX_GENERATIONS } from "@/mock";
import { PlatformEnum } from "@/types/platform";
import { useEffect, useState } from "react";
import { useFreeCreateContext } from "@/context/FreeCreateContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import { useFetchTags } from "@/query-api/queries/useFetchTags";

export const freeCreateFormSchema = z.object({
    platform: z.enum([
        PlatformEnum.Text,
        PlatformEnum.Image,
        PlatformEnum.Email,
        PlatformEnum.Audio,
        PlatformEnum.Video,
        PlatformEnum.Twitter,
        PlatformEnum.Instagram,
        PlatformEnum.Facebook,
        PlatformEnum.LinkedIn,
        PlatformEnum.BlogPost,
    ]),
    description: z
        .string()
        .max(250, { message: "Description must be at most 250 characters" })
        .optional(),
    subject: z
        .string()
        .max(50, { message: "Subject must be at most 50 characters" })
        .optional(),
    productId: z.string().optional(),
    personaId: z.string().optional(),
}).refine((data) => {
    if (!data.subject && !data.productId) {
        return !!data.description;
    }
    return true;
}, {
    message: "Description is required if Subject or Product are not set",
    path: ["description"],
});

function FreeCreateForm() {
    const {
        setSelectedPlatform,
        isGenerating,
        setIsGenerating,
        numGenerations,
        setNumGenerations
    } = useFreeCreateContext();

    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isAddingPersona, setIsAddingPersona] = useState(false);

    const form = useForm({
        resolver: zodResolver(freeCreateFormSchema),
        defaultValues: {
            subject: '',
            productId: '',
            personaId: '',
            platform: PlatformEnum.Twitter,
            description: '',
        },
    });

    function onSubmit(values: z.infer<typeof freeCreateFormSchema>) {
        console.log(values);
        if (numGenerations >= MAX_GENERATIONS) {
            console.error("Max generations reached");
            return;
        }

        setIsGenerating(true);
        setNumGenerations(numGenerations + 1);
        setTimeout(() => { setIsGenerating(false) }, 3000);
    }

    const formValues = useWatch({ control: form.control });

    useEffect(() => {
        setSelectedPlatform(formValues.platform as PlatformEnum);
    }, [formValues, setSelectedPlatform]);

    // Description Speech Recognition
    const [listening, setListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            form.setValue('description', form.getValues('description') + ' ' + transcript);
        };

        recognition.start();
        setRecognition(recognition);
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    const { data: subjects, isLoading: isLoadingSubjects } = useFetchTags();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
                <FormField
                    control={form.control}
                    name="platform"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Output</FormLabel>
                            <FormControl>
                                <Controller
                                    name="platform"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Select value={field.value} onValueChange={field.onChange} disabled={isGenerating}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a Platform" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {platforms.map((platform) => (
                                                    <SelectItem key={platform.id} value={platform.name}>
                                                        {platform.name}
                                                    </SelectItem>
                                                ))}
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Controller
                                        name="description"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                placeholder="..."
                                                className="w-full"
                                                style={{ resize: "none" }}
                                                disabled={isGenerating}
                                            />
                                        )}
                                    />
                                    <button
                                        type="button"
                                        onClick={listening ? stopListening : startListening}
                                        className="absolute bottom-3 right-3"
                                        disabled={isGenerating}
                                    >
                                        <MicrophoneIcon className="h-5 w-5" />
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <div>
                    {isAddingSubject ? (
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Subject</FormLabel>
                                    <div className="flex items-center gap-x-3">
                                        <FormControl>
                                            <Controller
                                                name="subject"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange} disabled={isGenerating}>
                                                        <SelectTrigger className="w-full" value={field.value}>
                                                            <SelectValue placeholder="Select a Subject" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {!isLoadingSubjects && subjects?.map((subject) => (
                                                                <SelectItem key={subject.id} value={subject.name}>
                                                                    {subject.name}
                                                                </SelectItem>
                                                            ))}

                                                            {isLoadingSubjects && (
                                                                <div className="px-2 text-center">
                                                                    ...
                                                                </div>

                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                form.setValue("subject", "");
                                                setIsAddingSubject(false)
                                            }}
                                            className="float-right text-sm text-gray-500 p-1 h-auto"
                                        >
                                            <XMarkIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => setIsAddingSubject(true)}
                            className="w-full mb-2 gap-x-1"
                            disabled={isGenerating}
                        >
                            <PlusIcon className="h-4 w-4" /> Subject
                        </Button>
                    )}

                    {isAddingProduct ? (
                        <FormField
                            control={form.control}
                            name="productId"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Product</FormLabel>
                                    <div className="flex items-center gap-x-3">
                                        <FormControl>
                                            <Controller
                                                name="productId"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange} disabled={isGenerating}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Product" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {products.map((product) => (
                                                                <SelectItem key={product.id} value={product.id}>
                                                                    {product.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                form.setValue("productId", "");
                                                setIsAddingProduct(false)
                                            }}
                                            className="float-right text-sm text-gray-500 p-1 h-auto"
                                        >
                                            <XMarkIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => setIsAddingProduct(true)}
                            className="w-full mb-2 gap-x-1"
                            disabled={isGenerating}
                        >
                            <PlusIcon className="h-4 w-4" /> Product
                        </Button>
                    )}

                    {isAddingPersona ? (
                        <FormField
                            control={form.control}
                            name="personaId"
                            render={({ field }) => (
                                <FormItem className="mb-6">
                                    <FormLabel>Persona</FormLabel>
                                    <div className="flex items-center gap-x-3">
                                        <FormControl>
                                            <Controller
                                                name="personaId"
                                                control={form.control}
                                                render={({ field }) => (
                                                    <Select value={field.value} onValueChange={field.onChange} disabled={isGenerating}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Persona" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {personas.map((persona) => (
                                                                <SelectItem key={persona.id} value={persona.id}>
                                                                    {persona.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => {
                                                form.setValue("personaId", "");
                                                setIsAddingPersona(false)
                                            }}
                                            className="float-right text-sm text-gray-500 p-1 h-auto"
                                        >
                                            <XMarkIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    ) : (
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => setIsAddingPersona(true)}
                            className="w-full mb-2 gap-x-1"
                            disabled={isGenerating}
                        >
                            <PlusIcon className="h-4 w-4" /> Persona
                        </Button>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isGenerating}
                >
                    Generate
                </Button>
            </form>

            {/* <div>
                <pre>{JSON.stringify(form.getValues(), null, 2)}</pre>
            </div> */}
        </Form >
    );
}

export default FreeCreateForm;
