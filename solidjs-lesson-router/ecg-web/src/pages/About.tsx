import { Component, createEffect, Suspense } from "solid-js";
import { useRouteData } from "@solidjs/router";

export default function About() {
  const name = useRouteData<() => string>();

  createEffect(() => {
    console.log(name());
  });

  return (
    <section>
      <h1>About</h1>

      <p>Web client for ECG Hub</p>

      <p>
        <span>Website was created using</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp;{name()}</span>
        </Suspense>
      </p>
    </section>
  );
}
