import { useQuery } from '@tanstack/react-query'

const fetchPersonas = async () => {
    try {
        const baseUrl = 'http://localhost:3000/api';
        const url = `${baseUrl}/personas`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('fail: fetchPersonas', e);
        return [];
    }
}

export const useFetchPersonas = () => {
    return useQuery({ queryKey: ['personas'], queryFn: fetchPersonas });
};
