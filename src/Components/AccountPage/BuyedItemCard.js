import './AccountPage.css';
import { Link } from 'react-router-dom';
const BuyedItemCard = (props) => {


    const downloadFile = (url, fileName) => {
       
      };

    return (
        <div className="asset-card">
            <img src={props.productImage} alt={props.productImage}/>
                <div className="asset-details">
                    <h3 className="asset-title">{props.productName}</h3>
                    <button onClick={() => downloadFile(props.productLink,props.productName.replaceAll(' ', '_')+props.productLink.substring(props.productLink.lastIndexOf('.')))} className="download-button">Скачати</button>
                    <Link to={props.productLink} target="_blank" download>Download</Link>
                </div>
        </div>

    );
}

export default BuyedItemCard;