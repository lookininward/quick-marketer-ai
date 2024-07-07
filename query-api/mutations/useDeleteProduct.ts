import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteProduct = async (id: string) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/products/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    });
};