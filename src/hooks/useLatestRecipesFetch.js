import { useEffect, useState } from "react";
import API from "../API";

const initialState = {
  items: [],
  links: { first: null, last: null, next: null, self: null },
  metadata: {
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 10,
    total_items: 0,
    total_pages: 0,
  },
};

export const useLatestRecipesFetch = () => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      setLoading(true);
      try {
        const response = await API.fetchLatestRecipes();
        setState(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  return { recipes: state, error, loading };
};
