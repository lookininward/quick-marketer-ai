import { useMutation, useQueryClient } from '@tanstack/react-query'

const createTag = async (tag) => {
    return {
        'id': '1',
        'name': tag.name,
        'description': tag.description,
    }
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
