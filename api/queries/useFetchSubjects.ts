import { useQuery } from '@tanstack/react-query'
import { MOCK_SUBJECTS } from '@/mock/subjects'

const fetchSubjects = async () => {
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_SUBJECTS);
        }, 3000);
    });
    return data;
};

export const useFetchSubjects = () => {
    return useQuery({ queryKey: ['subjects'], queryFn: fetchSubjects });
};
