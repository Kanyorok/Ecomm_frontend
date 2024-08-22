import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO, RESET_CART } from "../constants/cartConstants";
const apiUrl = process.env.REACT_APP_API_URL || 'https://kamandorabackend.kamandoradesigns.com';

export const addItemToCart = (id, quantity) => async (dispatch, getState) =>{
    const { data } = await axios.get(`${apiUrl}/api/v1/product/${id}`)
    const showImage =data.product.images[0].url;
    console.log(apiUrl);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product.id,
            name: data.product.name,
            price: data.product.price,
            image: showImage,
            stock: data.product.stock,
            quantity
        }
    }) 

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) =>{

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    }) 

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const resetCart = () => (dispatch) => {
    dispatch({
        type: RESET_CART
    });

    localStorage.removeItem('cartItems');
};

export const saveShippingInfo = (data) => async (dispatch) =>{

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    }) 

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}