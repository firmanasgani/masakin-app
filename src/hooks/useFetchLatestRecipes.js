import { useState, useEffect } from "react";
import { get } from "../utils/ApiInterceptors";

export const useFetchLatestRecipes = () => {
    const token = localStorage.getItem('access_token');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
        const fetchLatestRecipes = async () => {
            isLoading(true);
            try {
                setError(null)
                const response = await get('/recipes?page=1&per_page=10&sort_by=created_at&order=desc', {
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
