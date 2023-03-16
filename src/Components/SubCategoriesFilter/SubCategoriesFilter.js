import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from 'react-redux';
import { selectSubCategories, setSubCategories } from "../../app/filtersSlice";
import { getAsync as getSubCat, selectValues as getSubCategories } from "../../app/subCategoriesSlice";

const SubCategoriesFilter = () => {
    const subCategories = useSelector(getSubCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubCat());
    }, []);

    return (
        <div style={{paddingLeft:35}}>
            <h5>Filters:</h5>
            {subCategories.map((x, idx) =>{
                return <Form.Check key={idx} onClick={async(e) => {
                    await dispatch(setSubCategories({id:x.id, checked:e.target.checked}));
                    
                }} id={`subCategory=${x.id}`} type='checkbox' className="subcategory-input" label={x.name}></Form.Check>
            })}
        </div>
    );
}

export default SubCategoriesFilter;