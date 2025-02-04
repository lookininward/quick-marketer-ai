import { useMutation, useQueryClient } from '@tanstack/react-query'

const createPersona = async (persona) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/personas`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
    });
    const data = await response.json();
    return data;
};

export const useCreatePersona = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPersona,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personas'] })
        },
    });
};
