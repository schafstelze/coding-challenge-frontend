import {FC} from 'react';
import Pagination from '@material-ui/lab/Pagination';

type PagintationComponentProps = {
    currentPage: number;
    handlePageChange: (page: number) => void;
}

const PagintationComponent: FC<PagintationComponentProps> = ({
    currentPage, handlePageChange
}) => {
    return (
        <Pagination
        // count={totalPages}
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