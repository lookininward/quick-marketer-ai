import { useQuery } from '@tanstack/react-query'
import { MOCK_PERSONAS } from '@/mock/personas'

const fetchPersonas = async () => {
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PERSONAS);
        }, 3000);
    });
    return data as Persona[];
}

export const useFetchTags = () => {
    return useQuery({ queryKey: ['personas'], queryFn: fetchPersonas });
};
