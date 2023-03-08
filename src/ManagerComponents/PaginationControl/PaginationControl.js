import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { decrementPage, incrementPage, selectPage, selectPerPage, setPage } from '../../app/filtersSlice';
import { getProductCount, selectHits } from '../../app/productsSlice';

const PaginationControl = () => {
    const page = useSelector(selectPage);
    const perPage = useSelector(selectPerPage);
    const hits = useSelector(selectHits);
    const [maxPage, setMaxPage] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductCount());
        setMaxPage(Math.ceil(hits / perPage));
        console.log(maxPage);
    }, []);

    const goToPage = (e, id) => {
        e.preventDefault();
        dispatch(setPage(id))
    }

    const goToPrev =(e) => {
        e.preventDefault();
        if(page > 1)
            dispatch(decrementPage());
    }

    const goToNext = async(e) => {
        e.preventDefault();
        if(page < maxPage)
            dispatch(incrementPage());
    }
    return(
        <Pagination>
            <Pagination.First onClick={(e) => goToPage(e,1)}/>
            <Pagination.Prev onClick={(e) => goToPrev(e)} />
            <Pagination.Next onClick={(e) => goToNext(e)}/>
            {/* <Pagination.Last onClick={(e) => }/> */}
        </Pagination>
    );
}

export default PaginationControl;