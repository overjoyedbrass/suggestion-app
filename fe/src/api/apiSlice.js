import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { BASE_URL } from '../config'

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params, headers }) => {
    try {
        const result = await axios({ url: baseUrl + url, method, data, params, headers })
        return { data: result.data }
    } catch (error) {
        let err = error
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err?.message,
            },
        }
    }
}

export const apiSlice = createApi({
    baseQuery: axiosBaseQuery({
        baseUrl: BASE_URL+"/api/",
    }),
    tagTypes: [ "Sugg" ],
    endpoints: builder => ({
        getSuggestions: builder.query({
            query: () => ({ 
                url: 'suggestions', 
                method: "get"
            }),
            providesTags: [ "Sugg" ],
        }),
        getSuggestionById: builder.query({
            query: (id) => ({ 
                url: `suggestions/${id}`, 
                method: "GET"
            }),
            providesTags: [ "Sugg" ],
        }),        
        insertSuggestion: builder.mutation({
            query: (formData) => ({ 
                url: "suggestions", 
                method: "POST", 
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            }),
            invalidatesTags: [ "Sugg" ]
        }),
    }),
})

export const {
    useGetSuggestionsQuery,
    useGetSuggestionByIdQuery,
    useInsertSuggestionMutation,
} = apiSlice