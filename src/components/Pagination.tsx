import {FC} from 'react';
import Pagination from '@material-ui/lab/Pagination';

type PagintationComponentProps = {
    currentPage: number;
    handlePageChange: (page: number) => void;
    totalPages: number;
}

const PagintationComponent: FC<PagintationComponentProps> = ({
    currentPage, handlePageChange, totalPages
}) => {
    return (
        <Pagination
        count={totalPages}
        onChange={(e, currentPage_: number) => {
            handlePageChange(currentPage_);
        }}
        showFirstButton
        showLastButton
        page={currentPage}
      />
    )
}

export default PagintationComponent;