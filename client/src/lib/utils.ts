import axios from "axios";

interface AuthResponse {
  isAuthenticated: boolean;
  user: any | null;
}

export const checkAuth = async (): Promise<AuthResponse> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/check`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { isAuthenticated: true, user: res.data.user };
  } catch {
    return { isAuthenticated: false, user: null };
  }
};
