import {Item} from '../types/items';
import {LIMIT, API_URL} from '../constans/constans';



//  {
//     data: Item[]; pagination: Record<string, string>
// }
export const getPaginatedItems = async (page: number): Promise<any> => {
    const url = `${API_URL}?_page=${page}&_limit=${LIMIT}`
    const res = await fetch(url);
    const data = await res.json();
    const linkHeaders = res.headers.get( "Link" );

    return {data, linkHeaders};
}