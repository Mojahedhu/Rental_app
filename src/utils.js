import { redirect } from "react-router-dom";

export const requireAuth = async (request) => {
  const pathname = new URL(request.url).pathname;
  const user = JSON.parse(localStorage.getItem("user")); // Check if the user is already authenticated

  if (!user) {
    throw redirect(
      `/login?message=You must login first.&redirectTo=${pathname}`
    );
  }

  return null; //user is authenticated
};
