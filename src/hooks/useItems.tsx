import {useState, useEffect, useCallback} from 'react';
import {getPaginatedItems} from '../api/items';
import {Item} from '../types/items';

const LIMIT = 3;

const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1)

    const handlePageChange = (page_: number) => {
        setPage(page_)
    }
    const fetchItems = useCallback(async () => {
        const {data, pagination} = await getPaginatedItems(page);
        setItems(data);
      }, [page])

    useEffect(() => {
        fetchItems();
    }, [page, fetchItems])


    return {items, page, handlePageChange};
}

export default useItems;