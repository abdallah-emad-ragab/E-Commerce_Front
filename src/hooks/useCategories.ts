import { useAppDispatch, useAppSelector } from "../store/hooks"
import thunkCategories from "../store/categories/thunk/thunkCategories";
import { useEffect } from "react";
import { categoriesCleanUp } from "../store/categories/categoriesSlice";

const useCategories = () => {
    const dispach = useAppDispatch();
    const { loading, records, error } = useAppSelector((state) => state.categories);

    useEffect(() => {
        const promise = dispach(thunkCategories());
        return () => {
            dispach(categoriesCleanUp());
            promise.abort();
            // This cleanup function will be called when the component using this hook unmounts, 
            //   ensuring that any ongoing API requests are canceled and the categories state is reset to its initial state.
        }
    }, [dispach]);

    return { loading, records, error };
}

export default useCategories;