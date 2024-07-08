import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewUserArticle, User, UserArticle } from "../../types/user";

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),
    tagTypes: ["USERS", "USER_ARTICLES"],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: ["USERS"],
        }),
        getUserArticle: builder.query({
            query: (id: number) => ({
                url:`/users/${id}/posts`,
                method: 'GET'
            }),
            providesTags: ['USER_ARTICLES']
        }),
        deleteUserArticle: builder.mutation({
            query: (id: number) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['USERS']
        }),
        updateUserArticle: builder.mutation({
            query: ({id, data}: {id: number, data: UserArticle}) => ({                
                url: `/posts/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['USER_ARTICLES']
        }),
        createUserArticle: builder.mutation({
            query: (data: NewUserArticle) => ({
                url: `/posts`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['USERS']
        }),
    }),
});

export const { 
    middleware: userApiMiddleware, 
    useGetUsersQuery: useGetUsers,
    useGetUserArticleQuery: useGetUserArticle,
    useDeleteUserArticleMutation,
    useUpdateUserArticleMutation,
    useCreateUserArticleMutation
} = userApi;

export default userApi;
