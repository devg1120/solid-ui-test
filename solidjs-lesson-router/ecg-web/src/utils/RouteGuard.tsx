import { Navigate, Outlet } from "@solidjs/router";
import { Component, Show } from "solid-js";
import { useAuth } from "./AuthContext";

export const UserRoute: Component<{}> = () => {
  const [user] = useAuth();

  return (
    <Show when={user() !== null} fallback={<Navigate href="/signin" />}>
      <Outlet />
    </Show>
  );
};

export const GuestRoute: Component<{}> = () => {
  const [user] = useAuth();

  console.log("123: " + user + "   " + typeof user);

  return (
    <Show when={user() === null} fallback={<Navigate href="/profile" />}>
      <Outlet />
    </Show>
  );
};
