export default function Confirmation() {
  return (
    <section class="section">
      <div
        class="container"
        style={{
          "padding-top": "25%",
          "padding-bottom": "30%",
          "margin-top": "50px",
        }}
      >
        <div class="columns is-centered">
          <div class="column is-half has-text-centered">
            <h1 class="title is-2">Merci pour votre réservation !</h1>
            <p class="subtitle">
              Nous avons bien reçu votre demande de réservation.
            </p>
            <p>
              Nous vous contacterons dès que possible pour confirmer votre
              réservation.
            </p>
            <p>Merci de nous faire confiance !</p>
            <div class="mt-5">
              <a href="/" class="button is-link">
                Retour à la page d'accueil
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
