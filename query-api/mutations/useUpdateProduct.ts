import { useMutation, useQueryClient } from '@tanstack/react-query'

const updateProduct = async (product: Product) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/products/${product.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product }),
    });
    const data = await response.json();
    console.log("updateProduct", data);
    return data;
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    });
}