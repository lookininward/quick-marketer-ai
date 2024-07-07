import { useQuery } from '@tanstack/react-query'

const fetchProducts = async () => {
    try {
        const baseUrl = 'http://localhost:3000/api';
        const url = `${baseUrl}/products`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('fail: fetchProducts', e);
        return [];
    }
}

export const useFetchProducts = () => {
    return useQuery({ queryKey: ['products'], queryFn: fetchProducts });
};
