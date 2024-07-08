import { useMutation, useQueryClient } from '@tanstack/react-query'

const updatePersona = async (persona: Persona) => {
    const baseUrl = 'http://localhost:3000/api';
    const url = `${baseUrl}/personas/${persona.id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ persona }),
    });
    const data = await response.json();
    console.log("updatePersona", data);
    return data;
}

export const useUpdatePersona = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePersona,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personas'] })
        },
    });
}