import { useMutation, useQueryClient } from '@tanstack/react-query'

const updateTag = async (tag: Tag) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/tags/${tag.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tag }),
    });
    const data = await response.json();
    console.log("updateTag", data);
    return data;
}

export const useUpdateTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tags'] })
        },
    });
}