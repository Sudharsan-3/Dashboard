import {configureStore} from "@reduxjs/toolkit"
import dataReducer  from "./serivce/dataSclice"
 
export const store = configureStore({
    reducer : {
        getAllData : dataReducer 
    },
})