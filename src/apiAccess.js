import axios from "axios";
import token from './jwtToken';

//const apiUrl = "https://assetstoreapi.azurewebsites.net/api";
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

const del = async (url) => {
    let res = {};
    await axios.delete(url, {
        headers:{
            "Access-Control-Allow-Origin": "*",
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
    return await get(`${apiUrl}/SubCategory/subCategoryList`);
}

const addSubCategory = async (state) => {
    return await post(`${apiUrl}/SubCategory/addSubCategory?subCategoryName=${state.subCategoryName}`);
}
const updateSubCategory = async(state) => {
    let subCategory = {
        id:state.id,
        name: state.name
    }
    return await put(`${apiUrl}/SubCategory/updateCategory`, subCategory);
}

const deleteSubCategory = async(state) => {
    return await del(`${apiUrl}/SubCategory/deleteSubCategory?subCategoryId=${state.subCategoryId}`);
}

//---------------categories---------------------
const getCategories = async() => {
    return await get(`${apiUrl}/Category/categoryList`)
}

const addCategory = async(state) => {
    return await post(`${apiUrl}/Category/addCategory?categoryName=${state.categoryName}`);
}

const updateCategory = async(state) => {
    let category = {
        id:state.id,
        name: state.name
    }
    return await put(`${apiUrl}/Category/updateCategory`, category);
}

const deleteCategory = async(state) => {
    return await del(`${apiUrl}/Category/deleteCategory?categoryId=${state.categoryId}`);
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
    return res;
}

const searchProducts = async(state) => {
    let res = await get(`${apiUrl}/Products/findProduct?productName=${state.searchText}`);
    return res;
}

const addProduct = async(state) => {
    let res = {};
    axios.post(`${apiUrl}/Products/addProduct`,state, {
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': "Bearer " + token.getToken()
                        }
                        }).then(function(response) {
                            if(response.data.token)
                                token.setToken(response.data.token);
                            res = response;
                        }).catch(() => res = undefined); 
                        return res;
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

const deleteProduct = async(state) => {
    return await del(`${apiUrl}/Products/deleteProduct?productId=${parseInt(state.productId)}`)
}

const getProductsInPage = async(state) => {
    return await get(`${apiUrl}/Products/productsInPage?perPage=${parseInt(state.perPage)}&page=${parseInt(state.page)}`);
}

const setStatus = async(state) => {
    return await post(`${apiUrl}/Products/setStatus?productId=${parseInt(state.productId)}&statusId=${parseInt(state.statusId)}`);
}

const getProductsCount = async() => {
    return await get(`${apiUrl}/Products/getProductCount`);
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
    updateProduct: updateProduct,
    deleteProduct : deleteProduct,
    setStatus: setStatus,
    getProductsCount: getProductsCount,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
    addSubCategory: addSubCategory,
    updateSubCategory: updateSubCategory,
    deleteSubCategory: deleteSubCategory
}

export default methods;