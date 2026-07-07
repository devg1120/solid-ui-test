export default function Footer() {
  return (
    <footer class="footer pb-0 pt-4 has-background-black">
      <div class="container has-text-white">
        <div class="columns">
          <div class="column is-one-third">
            <p class="subtitle is-5 has-text-weight-bold has-text-white">Nous contacter</p>
            <p class="is-size-6">
              11 avenue de Boursonne,
              <br />
              02600 Villers-Cotterêts, France
              <br />
              Téléphone : 09 69 36 86 12
            </p>
          </div>
          <div class="column is-one-third">
            <p class="subtitle is-5 has-text-weight-bold has-text-white">Liens</p>
            <ul>
              <li>
                <a href="/">Accueil</a>
              </li>
              <li>
                <a href="/aboutus">À propos de nous</a>
              </li>
            </ul>
          </div>
          <div class="column is-one-third">
          </div>
        </div>
        <hr />
        <div class="columns">
          <div class="column is-half">
            <p class="is-size-7">© 2023 Audi. Tous droits réservés.</p>
          </div>
          <div class="column is-half has-text-right">
            <p class="is-size-7">
              Conditions d'utilisation | Politique de confidentialité |
              Politique en matière de cookies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
