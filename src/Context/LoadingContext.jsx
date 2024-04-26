import { createContext, useContext, useState } from "react";

const loadingContext=createContext();

export const useLoading=()=> {return useContext(loadingContext)}

export const LoadingProvider=({children})=>{
        const [loading,setloading]=useState(true);
        setTimeout(() => {
            setloading(false)
            
        }, 1000);

    return(
        <loadingContext.Provider value={{loading,setloading}}>
            {children}
        </loadingContext.Provider>
    )
}