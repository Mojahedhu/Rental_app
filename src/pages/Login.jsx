import React from "react";
import {
  // redirect,
  Form,
  useSearchParams,
  useActionData,
  useNavigation,
  redirect,
  Link,
} from "react-router-dom";
import Loading from "../components/Loading";
import { loginUser } from "../authService";
import { useAuth } from "../Provider/AuthProvider";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  await sleep(1000);
  const pathname = new URL(request.url).searchParams.get("redirectTo");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    await loginUser(email, password);

    return redirect(pathname || "/host");
  } catch (err) {
    return err.message;
  }
}

function Login() {
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const [search] = useSearchParams();
  const inform = search.get("message");
  const { loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {inform && <h4 style={{ color: "red" }}>{inform}</h4>}
      {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>}

      <Form className="login-form" method="POST" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <div
          className="New-accout-lable"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <h4>Don't have accuont?</h4>
          <Link to={"/register"} state={{ search: `?${search.toString()}` }}>
            Create new account
          </Link>
        </div>
        <button
          style={{ backgroundColor: state === "submitting" ? "#ccc" : "" }}
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Logging in ..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}

export default Login;
