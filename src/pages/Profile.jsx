import React, { Suspense } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { deleteCurrentUser, getUser, logoutUser } from "../authService";
import { requireAuth } from "../utils";
import Loading from "../components/Loading";
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  await requireAuth(request);
  const user = getUser();
  return { user };
}

function PersonalDetails() {
  const promiseData = useLoaderData();
  const navigate = useNavigate();

  const renderProfileCard = (user) => {
    if (!user) {
      return <p className="message">No user data available.</p>;
    }
    return (
      <div className="profile-card">
        <h1 className="title">Personal profile</h1>
        <div className="avatar">
          <img
            src={`https://ui-avatars.com/api/?name=&${user.name}&background=random`}
            alt="User avatar"
          />
        </div>
        <p className="info">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="info">
          <strong>Email:</strong> {user.email}
        </p>
        <button
          className="logout-btn"
          onClick={() => {
            logoutUser();
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          className="delete-btn"
          onClick={() => {
            deleteCurrentUser();
            navigate("/");
          }}
        >
          Delete your accuont
        </button>
      </div>
    );
  };
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <Await resolve={promiseData.user}>{renderProfileCard}</Await>
      </Suspense>
    </div>
  );
}

export default PersonalDetails;
