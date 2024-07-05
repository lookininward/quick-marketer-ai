import { useMutation, useQueryClient } from '@tanstack/react-query'

const createTag = async (tag: Tag) => {
    return {
        'id': crypto.randomUUID(),
        'name': tag.name,
        'description': tag?.description,
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
