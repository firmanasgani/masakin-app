import { useState, useEffect } from "react";
import { get } from "../utils/ApiInterceptors";

export const useFetchLatestRecipes = ( ) => {
    const token = localStorage.getItem('access_token');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            isLoading(true);
            try {
                setError(null)
                const endpoint = '/recipes?page=1&per_page=100&sort_by=created_at&order=desc' 
                const response = await get(endpoint, {
                    'Authorization': `Bearer ${token}`,
                });
                setRecipes(response.data.items);
            } catch (error) {
                setError(error);
            } finally {
                isLoading(false);
            }
        };

        fetchLatestRecipes();
    }, []);

    return { recipes, error, loading };
}
