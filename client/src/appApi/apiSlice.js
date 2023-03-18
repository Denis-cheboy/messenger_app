import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiSlice=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://messenger-app-api.onrender.com"
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
              url:"/auth/login",
              method:"POST",
              body:{...data}
            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:"/auth/register",
                method:"POST",
                body:{...data}
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation}=apiSlice
