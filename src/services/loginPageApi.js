const API_URL = "http://localhost:5136/";

//login
export const login = async (loginData) => {
  try {
    const response = await fetch(API_URL + "Login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    if (response.ok) {
      localStorage.setItem("user", loginData.username);
      document.location = "/";
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
