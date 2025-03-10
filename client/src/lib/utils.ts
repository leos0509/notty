import axios from "axios";

export const checkAuth = async (): Promise<any> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/check`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { isAuthenticated: true, user: res.data.user };
  } catch (error) {
    return { message: error, isAuthenticated: false, user: null };
  }
};
