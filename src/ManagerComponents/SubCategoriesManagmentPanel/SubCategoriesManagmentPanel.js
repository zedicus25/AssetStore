import ManagerNavBar from "../ManagerNavBar/ManagerNavBar";
import AddSubCategoryPanel from "./AddSubCategoryPanel";
import SubCategoriesTable from "./SubCategoriesTabel";

const SubCategoriesManagmentPanel = () => {
    return(
    <div className="flexbox-row">
            <ManagerNavBar></ManagerNavBar>
            <div style={{padding:20}}>
                <div className="flexbox-column">
                    <h4>Adding sub-category:</h4>
                    <AddSubCategoryPanel></AddSubCategoryPanel>
                    <h4>Updating sub-categories:</h4>
                    <SubCategoriesTable></SubCategoriesTable>
                </div>
            </div>
        </div>
    );
}
export default SubCategoriesManagmentPanel;