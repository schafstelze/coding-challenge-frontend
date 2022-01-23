import {useState, useEffect, useCallback} from 'react';
import {getPaginatedItems} from '../api/items';
import {Item} from '../types/items';
import {parseLinkHeader, pageNumber} from './helper';

const useItems = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const handlePageChange = (page_: number) => {
        setPage(page_)
    }
    const fetchItems = useCallback(async () => {
        const {data, linkHeader} = await getPaginatedItems(page);
        setItems(data);
        if (linkHeader) {
            const paginationData = parseLinkHeader(linkHeader);
            const total = pageNumber(paginationData.last)
            setTotalPages(total);
        }
      }, [page])

    useEffect(() => {
        fetchItems();
    }, [page, fetchItems])


    return {items, page, totalPages, handlePageChange};
}

export default useItems;