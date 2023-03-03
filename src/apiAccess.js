import axios from "axios";
import token from './jwtToken';

//const apiUrl = "https://jwt20230228183505.azurewebsites.net/api";
const apiUrl = "http://wonof44260-001-site1.itempurl.com/api";
//const apiUrl = "https://localhost:7167/api";


const get = async (url) => {
    let res = [];
    await axios.get(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        }
    }).then(function(response){
        if(response.status == '200'){
            res = response.data;
        }
        
    });
    return res;
}
const post = async(url, data) => {
    let res = {};

    await axios.post(url, JSON.stringify(data), {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        }
    }).then(function(response) {
        if(response.data.token)
            token.setToken(response.data.token);
        res = response;
    }).catch(() => res = undefined); 
    return res;
}

const put = async(url, data) => {
    let res ={};
    await axios.put(url, JSON.stringify(data), {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token.getToken()
        }
    }).then(function(response) {
        if(response.data.token)
            token.setToken(response.data.token);
        res = response;
    }).catch(() => res = undefined); 
    return res;
}

//--------------subcategories----------------
const getSubCategories = async () => { 
    return await get(`${apiUrl}/Category/subCategoryList`);
}

//---------------categories---------------------
const getCategories = async() => {
    return await get(`${apiUrl}/Category/categoryList`)
}

//-------------------products-------------------

const getAllAssets = async () => {
    return await get(`${apiUrl}/Products/productsList`);
}

const getPopularAssets = async () => {
    return await get(`${apiUrl}/Products/getPopularProducts`);
}

const getProductsInCategory = async (state) => {
    let res = await get(`${apiUrl}/Products/getProductsInCategory?categoryId=${state.categoryId}`);
    console.log(res);
    return res;
}

const searchProducts = async(state) => {
    let res = await get(`${apiUrl}/Products/findProduct?productName=${state.searchText}`);
    return res;
}

const addProduct = async(state) => {
    let res = await post(`${apiUrl}/Products/addProduct`, {
        Name: state.productName,
        Price: state.productPrice,
        Photo: state.productPhoto,
        CategoryId: state.categoryId,
        SubCategoryId: state.subCategoryId,
        Quantity: state.quantity,
        Sold: state.sold,
        StatusId: 1
    });
    return  res;
}

const updateProduct = async(state) => {
    let res = await put(`${apiUrl}/Products/updateProduct`, {
        Id: state.id,
        Name: state.productName,
        Price: state.productPrice,
        Photo: state.productPhoto,
        CategoryId: state.categoryId,
        SubCategoryId: state.subCategoryId,
        Quantity: state.quantity,
        Sold: state.sold,
        StatusId: state.statusId
    });
    return res;
};

const getProductsInPage = async(state) => {
    return await get(`${apiUrl}/Products/productsInPage?perPage=${parseInt(state.perPage)}&page=${parseInt(state.page)}`);
}


//--------------------authorization--------------------
const signIn = async(login, password) => {
    return await post(`${apiUrl}/Authentication/login`, {Password: password, UserName: login});
}

const signUp = async(login, email, password) => {
    return await post(`${apiUrl}/Authentication/regUser`, {Email:email,Password: password, UserName: login});
}

const methods = {
    getSubCategories: getSubCategories,
    getAllAssets: getAllAssets,
    getPopularAssets: getPopularAssets,
    getProductsInCategory: getProductsInCategory,
    signIn : signIn,
    signUp : signUp,
    searchProducts: searchProducts,
    getCategories: getCategories,
    addProduct: addProduct,
    getProductsInPage: getProductsInPage,
    updateProduct: updateProduct
}

export default methods;