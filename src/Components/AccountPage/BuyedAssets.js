import UserNavigationPage from "./UserNavigationBar";
import "./AccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getBuyedProducts, selectBuyedProducts } from "../../app/productsSlice";
import { useEffect, useState } from "react";
import token from './../../jwtToken';
import { useNavigate } from "react-router-dom";
import BuyedItemCard from "./BuyedItemCard";

const BuyedAssets = () => {

    const buyedProducts = useSelector(selectBuyedProducts);
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let user = token.getUserData();
        if (!user.User)
            navigate('/');
        dispatch(getBuyedProducts({ userLogin: user.username }))
    }, []);

    return (
        <>
            <UserNavigationPage></UserNavigationPage>
            <div className="page buyedAsset-panel">
                <div className="search-buyed">
                    <input className="search-input-buy" onChange={(e) => setSearch(e.target.value)} type='search' placeholder="Search assets"></input>
                    
                </div>
                {buyedProducts?.filter(x => x?.name.toLowerCase().includes(search.toLowerCase())).map((x, idx) => {
                    return <BuyedItemCard key={idx} productLink={x.linkToFile} productId={x.id} productName={x.name}  productImage={x.photo}></BuyedItemCard>
                })}
            </div>
        </>
    );
}

export default BuyedAssets;