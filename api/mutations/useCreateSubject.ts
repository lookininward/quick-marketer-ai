import { useMutation, useQueryClient } from '@tanstack/react-query'

const createSubject = async (subject) => {
    return {
        'id': '1',
        'name': subject.name,
        'email': subject.email,
    }
};

export const useCreateSubject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSubject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] })
        },
    });
};
