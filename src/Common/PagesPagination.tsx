import React from 'react';
import _ from 'lodash';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

type PagesPaginationProps = { itemsCount:number, pageSize:number, onPageChange:Function, currentPage:number };

const PagesPagination = (props:PagesPaginationProps) => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props;
    console.log(currentPage);

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
        <ul className="pagination" >
      {pages.map((page) => (
        <li key={page} className={page ===currentPage ? "page-item active" : "page-item"}>
          <button type="button" onClick={()=>onPageChange(page)} className="page-link" 
          >
            {page}
          </button>
        </li>
      ))}
        </ul>
     </nav>
  );
};

export default PagesPagination;
