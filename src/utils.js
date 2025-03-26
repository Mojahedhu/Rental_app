// import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const isLoggedIn = localStorage.getItem("loggedin");
  if (!isLoggedIn) {
    // throw redirect("/login?message=You must log in first.");
    const redi =
      (window.location.href = `/login?message=You must log in first!&&redirectTo=${pathname}`);
    return redi;
  }

  return null;
}
