import{configureStore} from "@reduxjs/toolkit"
import cartReducer from "../features/CartSlice"
export default configureStore({
    reducer: {
        allCart: cartReducer,
    },
  })