import { withRouter } from "react-router-dom";
import useItems from '../hooks/useItems';
import List from "../components/List";
import Pagination from "../components/Pagination";


const DashboardPage = () => {

  const {items, page, handlePageChange} = useItems();
  return (
    <main>
      <List items={items} />
      <Pagination
      //  totalPages={totalPages} 
       currentPage={page} 
       handlePageChange={handlePageChange} />
    </main>
  )

}

export default withRouter(DashboardPage);
