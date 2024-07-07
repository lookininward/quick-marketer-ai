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
import { useCreateProduct } from "@/query-api/mutations/useCreateProduct";
import { useDeleteProduct } from "@/query-api/mutations/useDeleteProduct";
import { useUpdateProduct } from "@/query-api/mutations/useUpdateProduct";

export const createProductFormSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name must be at most 50 characters" }),
    description: z.string()
        .max(250, { message: "Description must be at most 250 characters" })
        .optional(),
});

function ProductForm({ product, onSuccess }: { product?: Product, onSuccess?: () => void }) {
    const form = useForm({
        resolver: zodResolver(createProductFormSchema),
        defaultValues: {
            name: product ? product.name : '',
            description: product ? product.description || '' : '',
        },
    });

    const { mutate: createProduct, isError, error } = useCreateProduct();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    async function onSubmit(values: z.infer<typeof createProductFormSchema>) {
        try {
            const isUpdate = !!product?.id;
            const productData = {
                ...(isUpdate && { id: product.id }),
                name: values.name,
                description: values.description,
            } as Product;

            if (!isUpdate) {
                await createProduct(productData);
            } else {
                await updateProduct(productData);
            }

            if (onSuccess) onSuccess();
        } catch (e) {
            console.error('fail: onSubmit', e);
        }
    }

    const onDelete = async () => {
        try {
            if (!product) return;
            await deleteProduct(product.id);
            if (onSuccess) onSuccess();
        } catch (e) {
            console.error('fail: onDelete', e);
        }
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

                <div className="flex gap-x-2">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={false}
                    >
                        {product ? 'Update' : 'Create'}
                    </Button>

                    {product && (
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

export default ProductForm;