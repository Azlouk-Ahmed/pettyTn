import { useContext } from "react"
import { PostsContext } from "../context/postsContext";

export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if(!context) {
        throw Error ("postsContext must be used inside a postContextProvider")
    }
    return context;
}