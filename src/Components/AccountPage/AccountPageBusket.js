import { useSelector } from "react-redux";
import { selectProducts } from "../../app/busketSlice";
import PaymentComponent from "./PaymetComponent";

const AccountPageBusket = () => {
    const productsInBusket = useSelector(selectProducts);

    if(productsInBusket.length > 0){
        return(
            <div>
                <PaymentComponent></PaymentComponent>
            </div>
        );
    }
    else{
        return(
            <div className="empty-cart">
            <p>Busket is empty!</p>
          </div>
        );
    }
}
export default AccountPageBusket;