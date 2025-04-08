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
import { registerUser } from "../authService";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  await sleep(1000);

  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    await registerUser(name, email, password);
  } catch (err) {
    return err.message;
  }
  throw redirect("/personal");
}

function Register() {
  const errorMessage = useActionData();
  const { state } = useNavigation();

  const [search] = useSearchParams();
  const inform = search.get("message");

  return (
    <div className="register-container">
      <h1>Create new account</h1>
      {inform && <h4 style={{ color: "red" }}>{inform}</h4>}
      {errorMessage && <h4 style={{ color: "red" }}>{errorMessage}</h4>}

      <Form className="register-form" method="POST" replace>
        <input name="name" type="text" placeholder="Your name" />
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <div
          className="knew-accout-lable"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <h4>Do you have accuont?</h4>
          <Link to={"/login"}>Login</Link>
        </div>
        <button
          style={{ backgroundColor: state === "submitting" ? "#ccc" : "" }}
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Loading ..." : "Register"}
        </button>
      </Form>
    </div>
  );
}

export default Register;
