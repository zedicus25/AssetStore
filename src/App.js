import './App.css';
import MainPage from './Components/MainPage/MainPage';
import ThreeDPage from './Components/ThreeDPage/ThreeDPage';
import TwoDPage from './Components/TwoDPage/TwoDPage';
import AudioPage from './Components/AudioPage/AudioPage';
import VFXPage from './Components/VFXPage/VFXPage';
import AddOnsPage from './Components/AddOnsPage/AddOnsPage'
import MainManagerPage from './ManagerComponents/MainManagerPage/MainManagerPage';
import MainAdminPage from './AdminComponents/MainAdminPage/MainAdminPage';
import SearchPage from './Components/SearchPage/SearchPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProductPanel from './ManagerComponents/AddProductsPanel/AddProductPanel';
import UpdateProductPanel from './ManagerComponents/UpdateProductsPanel/UpdateProductPanel';
import CategoriesManagmentPanel from './ManagerComponents/CategoriesManagmentPanel/CategoriesManagmentPanel';
import SubCategoriesManagmentPanel from './ManagerComponents/SubCategoriesManagmentPanel/SubCategoriesManagmentPanel';
import AccountPage from './Components/AccountPage/AccountPage';

const App = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='/threedpage' element={<ThreeDPage/>}></Route>
          <Route path='/twodpage' element={<TwoDPage/>}></Route>
          <Route path='/addonspage' element={<AddOnsPage/>}></Route>
          <Route path='/audiopage' element={<AudioPage/>}></Route>
          <Route path='/vfxpage' element={<VFXPage/>}></Route>
          <Route path='/searchPage' element={<SearchPage/>}></Route>
          <Route path='/manager' element={<MainManagerPage/>}></Route>
          <Route path='/account' element={<AccountPage></AccountPage>}></Route>
          <Route path='/manager/addproductpanel' element={<AddProductPanel/>}></Route>
          <Route path='/manager/updateproductpanel' element={<UpdateProductPanel/>}></Route>
          <Route path='/manager/categoriesmanagmentpanel' element={<CategoriesManagmentPanel/>}></Route>
          <Route path='/manager/subcategoriesmanagmentPanel' element={<SubCategoriesManagmentPanel/>}></Route>
          <Route path='/admin' element={<MainAdminPage/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
