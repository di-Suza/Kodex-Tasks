import { useContext } from "react";
import BlogContext from "../contexts/blogContext";

export const useBlogs = () => useContext(BlogContext);
