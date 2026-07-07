export default function Header() {
  return (
    <section>
  <div class="hero mb-6">
    <div class="container is-flex is-flex-direction-column is-justify-content-space-between has-text-centered is-flex-grow-1 is-align-items-flex-end is-justify-content-center">
      <picture id="Audi" class="has-text-centered">
        <source media="(max-width: 700px)" srcset="/images/audi-home-mobile.avif" />
        <img alt="Audi" src="/images/audi-home.avif" />
      </picture>
      <div>
        <h1 class="title is-4 is-size-5-desktop is-size-7-mobile has-text-white" style={{ "margin-top": "-70px", "margin-right": "10px" }}>
          Design élégant, performances et une technologie de pointe, voici Audi.
        </h1>
      </div>
    </div>
  </div>
</section>
    
  );
}
