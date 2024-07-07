import { useMutation, useQueryClient } from '@tanstack/react-query'

const createProduct = async (product: Product) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/products`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product }),
    });
    const data = await response.json();
    return data;
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    });
};
