import ManagerNavBar from "../ManagerNavBar/ManagerNavBar";
import AddCategoryPanel from "./AddCategoryPanel";
import CategoriesTable from "./CategoriesTabel";

const CategoriesManagmentPanel = () => {
    return(
    <div className="flexbox-row">
            <ManagerNavBar></ManagerNavBar>
            <div style={{padding:20}}>
                <div className="flexbox-column">
                    <h4>Adding category:</h4>
                    <AddCategoryPanel></AddCategoryPanel>
                    <h4>Updating categories:</h4>
                    <CategoriesTable></CategoriesTable>
                </div>
            </div>
        </div>
    );
}
export default CategoriesManagmentPanel;