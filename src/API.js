const API_URL = process.env.REACT_APP_API_URL

const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export default {
  async login(email, password) {
    const response = await fetch(`${API_URL}/users/login`, {
      ...defaultOptions,
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credential");
    }

    return response.json();
  },
  async authenticate() {
    const accessToken = localStorage.getItem("access_token");

    return await (
      await fetch(`${API_URL}/users/me`, {
        ...defaultOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();
  },
  async fetchLatestRecipes() {
    const accessToken = localStorage.getItem("access_token");

    return await (
      await fetch(`${API_URL}/recipes`, {
        ...defaultOptions,
        headers: {
          ...defaultOptions.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();
  },
};
