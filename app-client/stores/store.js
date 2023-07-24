import {configureStore} from "@reduxjs/toolkit";

import VenueReducer from "../features/VenueData/venueSlice";
import photographReducer from "../features/PhotographData/photographSlice";
import cateringReducer from "../features/CateringData/cateringSlice";

import productReducer from "../features/PackageData/packageSlice";
import detailProductReducer from "../features/PackageData/PackageDetail";

import usersReducer from "../features/UserData/loginSlice";
import userRegisterReducer from "../features/RegisterData/registerSlice";

import inputDateBudgetReducer from "../features/inputDateBudget/dateBudgetSlice";

import addCartReducer from "../features/CartData/AddCart";

import cartReducer from "../features/CartData/GetCart";

import addCustomCartReducer from "../features/CartData/AddCustomerCart";

import transactionReduver from "../features/Transaction/PostTransaction";

import fetchUserReducer from "../features/UserData/fetchUserSlice";
export const store = configureStore({
  reducer: {
    venue: VenueReducer,
    photograph: photographReducer,
    catering: cateringReducer,

    product: productReducer,
    detailProduct: detailProductReducer,

    users: usersReducer,
    register: userRegisterReducer,
    inputDateBudget: inputDateBudgetReducer,
    addCart: addCartReducer,
    cart: cartReducer,
    addCustomCart: addCustomCartReducer,
    transaction: transactionReduver,
    fetchUser: fetchUserReducer,
  },
});
