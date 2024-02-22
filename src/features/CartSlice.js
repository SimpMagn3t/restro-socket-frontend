import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[],
    totalPrice:0,
    tableNumber:0
};
export const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            let find=state.cart.findIndex((item)=>item._id===action.payload._id);
            if(find>=0){
                state.cart[find].quantity+=1;
            }
            else{
                state.cart.push(action.payload)
            }
        },
        addTable:(state,action)=>{
            state.tableNumber=action.payload;
        }
    },
});
export const {addToCart,addTable}=cartSlice.actions;
export default cartSlice.reducer;