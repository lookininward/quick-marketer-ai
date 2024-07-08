import { useMutation, useQueryClient } from '@tanstack/react-query'

const deletePersona = async (id: string) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/personas/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}

export const useDeletePersona = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePersona,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personas'] })
        },
    });
};