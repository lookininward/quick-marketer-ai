import { useMutation, useQueryClient } from '@tanstack/react-query'

const createPersona = async (persona) => {
    return {
        'id': '1',
        'name': persona.name,
        'description': persona.description,
    }
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
