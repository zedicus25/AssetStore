import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBlock.css'

  const SearchBlock = () => {

    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const search = () => {
        navigate('/');
        navigate('/searchPage', {state: {
            searchText: searchText
        }});
    }

    return(
        <div className='flexbox-row'>
        <h2 className='padding-top-15 store-name'>Asset shop</h2>
        <div className='flexbox-row margin-top-15'>
            <input onChange={(e) => setSearchText(e.target.value)} className='input search-inp' type='text' placeholder='Search assets'></input>
            <input onClick={() => search()}  className='search-btn' type='button' value='Search'></input>
        </div>
    </div>
    );
  }

  export default SearchBlock;