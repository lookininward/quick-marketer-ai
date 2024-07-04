import { useQuery } from '@tanstack/react-query'
import { MOCK_TAGS } from '@/mock/tags'

const fetchTags = async () => {
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_TAGS);
        }, 3000);
    });
    return data as Tag[];
}

export const useFetchTags = () => {
    return useQuery({ queryKey: ['tags'], queryFn: fetchTags });
};
