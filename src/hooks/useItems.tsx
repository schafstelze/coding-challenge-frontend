import {useState, useEffect, useCallback} from 'react';
import {getItems} from '../api/items';
import {Item} from '../types/items';

const LIMIT = 3;

const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1)

    const handlePageChange = (page_: number) => {
        setPage(page_)
    }
    const fetchItems = useCallback(async () => {
        const data = await getItems(page);
        setItems(data);
      }, [page])

    useEffect(() => {
        fetchItems();
    }, [page, fetchItems])

    const totalPages = Math.ceil(items.length/LIMIT)

    return {items, page, totalPages, handlePageChange};
}

export default useItems;