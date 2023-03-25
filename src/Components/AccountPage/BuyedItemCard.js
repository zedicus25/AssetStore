import './AccountPage.css';
import axios from 'axios';
import fileDownload from 'js-file-download';

const BuyedItemCard = (props) => {


    const downloadFile = (url, fileName) => {
        axios.get(url, {
            responseType: 'blob',
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((res) => {
                fileDownload(res.data, fileName)
            })
    };

    return (
        <div className="asset-card">
            <img src={props.productImage} alt={props.productImage} />
            <div className="asset-details">
                <h3 className="asset-title">{props.productName}</h3>
                <button onClick={() => downloadFile(props.productLink, props.productName.replaceAll(' ', '_') + props.productLink.substring(props.productLink.lastIndexOf('.')))} className="download-button">Download</button>
            </div>
        </div>

    );
}

export default BuyedItemCard;