import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from 'react-redux';
import { selectSubCategories, setSubCategories } from "../../app/filtersSlice";
import { getAsync as getSubCat, selectValues as getSubCategories } from "../../app/subCategoriesSlice";
import './SubCategoriesFilter.css';

const SubCategoriesFilter = () => {
    const subCategories = useSelector(getSubCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubCat());
    }, []);

    return (
        <div style={{paddingLeft:35}}>
            <h5 className="filter-header">Filters:</h5>
            {subCategories.map((x, idx) =>{
                return( <div key={`${idx}+${idx}+${idx}`} className="checkbox-container" onClick={async(e) => {
                    await dispatch(setSubCategories({id:x.id, checked:e.target.checked}));}}>
                <input key={idx} type="checkbox" id={`subCategory=${x.id}`} name={`subCategory=${x.id}`}/>
                <label key={`${idx}+${idx}`} htmlFor={`subCategory=${x.id}`}>{x.name}</label>
              </div>); 
            })}
        </div>
    );
}

export default SubCategoriesFilter;