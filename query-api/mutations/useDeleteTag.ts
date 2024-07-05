import { useMutation, useQueryClient } from '@tanstack/react-query'

const deleteTag = async (id: string) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/tags/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export const useDeleteTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    });
};