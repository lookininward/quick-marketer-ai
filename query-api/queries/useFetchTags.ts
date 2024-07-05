import { useQuery } from '@tanstack/react-query'

const fetchTags = async () => {
    try {
        const baseUrl = 'http://localhost:3000/api';
        const url = `${baseUrl}/tags`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('fail: fetchTags', e);
        return [];
    }
}

export const useFetchTags = () => {
    return useQuery({ queryKey: ['tags'], queryFn: fetchTags });
};
