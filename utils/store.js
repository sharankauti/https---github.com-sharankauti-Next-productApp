import React, { useReducer } from "react";
import Cookies from 'js-cookie'
const Store = React.createContext();

const intialState = {
    darkMode:Cookies.get('darkMode') === 'ON' ? true : false,
    cart:{
        cartItems:Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
        shippingAddress:Cookies.get('shippingAddress') ? JSON.parse(Cookies.get('shippingAddress')) : {},
        paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : ''
        
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
    // orderInfo: Cookies.get('orderInfo') ? Cookies.get('orderInfo') : null
}

const reduser = (state,action)=>{
    switch (action.type) {
        case 'DARK_MODE_OFF':
            return {...state,darkMode:false}
        case 'DARK_MODE_ON':
            return {...state,darkMode:true}   
        case  'ADD_TO_CART':{
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find((item)=> item.name === newItem.name)
            const cartItems = existingItem ? state.cart.cartItems.map((item)=> item.name === existingItem.name ? newItem : item) : [...state.cart.cartItems,newItem];
            console.log(cartItems);
            Cookies.set('cartItems', JSON.stringify(cartItems) )
            return {
                ...state,
                cart:{
                    ...state.cart,
                    cartItems
                }
            }
        }

        case 'REMOVE_FROM_CART':{
            const cartItems = state.cart.cartItems.filter((item)=> item._id !== action.payload._id)
            Cookies.set('cartItems', JSON.stringify(cartItems) )
            return {
                ...state,
                cart:{
                    ...state.cart,
                    cartItems
                }
            }
        }

        case 'CART_CLEAR':
            return {...state,cart:{...state.cart,cartItems:[]}}

        case 'USER_LOGIN':
            return {...state,userInfo:action.payload}

        case 'LOGOUT_HANDLE':
            return {...state,userInfo:null,cart:{cartItems:[],shippingAddress:{},paymentMethod:''}}
        
        case 'SAVE_ADDRESS':
            return {...state,cart:{...state.cart,shippingAddress:action.payload}}

        case 'SAVE_PAYMENT_METHOD':
            return {...state,cart:{...state.cart,paymentMethod:action.payload}}
        default:
            return state
    }
}

export const StoreProvider = (props)=>{
    const [state, dispatch] = useReducer(reduser,intialState)
    const contextValue = {state , dispatch}
    return <Store.Provider value={contextValue}>{props.children}</Store.Provider>
}

export default Store;
