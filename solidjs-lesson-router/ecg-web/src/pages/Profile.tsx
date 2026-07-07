import { Component } from "solid-js";
import { useAuth } from "../utils/AuthContext";
import { UserStatus, defaultUser } from "../types/User";

const Profile: Component<{}> = () => {
  const user = defaultUser;

  return (
    <section>
      <h2>Profile - {user.username}</h2>
      <ul>
        <li>Email: {user.email}</li>
        <li>Status: {UserStatus[user.status]}</li>
      </ul>
    </section>
  );
};

export default Profile;
