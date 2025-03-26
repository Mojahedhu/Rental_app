import React from "react";
import { loginUser } from "../api";
import {
  // redirect,
  useLoaderData,
  Form,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

// export function loader({ request }) {
//   return new URL(request.url).searchParams.get("message");
// }

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
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    return (window.location.href = pathname || "/host");
  } catch (err) {
    return err.message;
  }
}

function Login() {
  // const message = useLoaderData();
  const errorMessage = useActionData();
  const { state } = useNavigation();
  console.log(state);
  const [search] = useSearchParams();
  const inform = search.get("message");

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {inform && <h4 style={{ color: "red" }}>{inform}</h4>}
      {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>}

      <Form className="login-form" method="POST" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />

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
