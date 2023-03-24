import './AccountPage.css';
import axios from 'axios';
import fileDownload from 'js-file-download';

const BuyedItemCard = (props) => {


    const downloadFile = (url, fileName) => {
        console.log(fileName);
        /*fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
          .then(res => res.blob())
          .then(res => {
            const aElement = document.createElement('a');
            aElement.setAttribute('download', fileName);
            const href = URL.createObjectURL(res);
            aElement.href = href;
            aElement.setAttribute('target', '_blank');
            aElement.click();
            URL.revokeObjectURL(href);
          });*/
          axios.get(url, {
            responseType: 'blob',
            headers:{
                'Access-Control-Allow-Origin': '*',
            }
          })
          .then((res) => {
            fileDownload(res.data, fileName)
          })
      };

    return (
        <div className="asset-card">
            <img src={props.productImage} alt={props.productImage}/>
                <div className="asset-details">
                    <h3 className="asset-title">{props.productName}</h3>
                    <button onClick={() => downloadFile(props.productLink,props.productName.replaceAll(' ', '_')+props.productLink.substring(props.productLink.lastIndexOf('.')))} className="download-button">Скачати</button>
                </div>
        </div>

    );
}

export default BuyedItemCard;