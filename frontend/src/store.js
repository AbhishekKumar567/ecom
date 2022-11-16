import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { newReviewReducer, productDetailsReducer, productReducer } from "./reducers/productReducer"
import { userReducer } from "./reducers/userReducer"
import { cartReducer } from "./reducers/cartReducer"
import { newOrderReducer } from "./reducers/orderReducer"

const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    cart:cartReducer,
    order:newOrderReducer,
    newReview:newReviewReducer
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ?JSON.parse(localStorage.getItem("cartItems"))
        :[],
        shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    },
}

const middleware = [thunk]

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
