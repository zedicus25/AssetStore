import UserNavigationPage from "./UserNavigationBar";
import "./AccountPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getBuyedProducts, selectBuyedProducts } from "../../app/productsSlice";
import { useEffect } from "react";
import token from './../../jwtToken';
import { useNavigate } from "react-router-dom";
import BuyedItemCard from "./BuyedItemCard";

const BuyedAssets = () => {

    const buyedProducts = useSelector(selectBuyedProducts);

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
                {buyedProducts?.map((x, idx) => { console.log(x);
                    return <BuyedItemCard key={idx} productLink={x.linkToFile} productId={x.id} productName={x.name}  productImage={x.photo}></BuyedItemCard>
                })}
            </div>
        </>
    );
}

export default BuyedAssets;