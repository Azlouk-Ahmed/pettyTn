import { useReducer, createContext } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    if (action.type === "SET__POSTS") {
        return {posts : action.payload }
    }else if(action.type === "UPDATE__POST"){
        return {posts : state.posts.map((post) => {
            return (post._id != action.payload._id) ? post : {...post,comments : action.payload.comments}
        })};
    } else {
        return state;
    }
}


export const PostsContextProvider = ( {children} ) => {

    const [state, dispatch] = useReducer(postsReducer, {posts : []});
    //console.log(state);
    return (
        <PostsContext.Provider value = {{...state, dispatch}}>
            {children}
        </PostsContext.Provider>
    )
}