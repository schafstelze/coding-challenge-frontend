import {Item} from '../types/items';

export const getItems = async (page: number): Promise<Item[]> => {
    const url = `http://localhost:3004/items?_page=${page}&_limit=3`
    const res = await fetch(url);
    return res.json();
}