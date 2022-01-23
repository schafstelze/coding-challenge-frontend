import {Item} from '../types/items';
import {LIMIT, API_URL} from '../constans/constans';


export const getPaginatedItems = async (page: number): Promise<{
    data: Item[]; linkHeader: string | null
}> => {
    const url = `${API_URL}?_page=${page}&_limit=${LIMIT}`
    const res = await fetch(url);
    const data = await res.json();
    const linkHeader = res.headers.get( "Link" );

    return {data, linkHeader};
}