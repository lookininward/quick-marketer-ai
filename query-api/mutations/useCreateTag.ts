import { useMutation, useQueryClient } from '@tanstack/react-query'

const createTag = async (tag: Tag) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/tags`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag }),
    });
    const data = await response.json();
    return data;
};

export const useCreateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    });
};
