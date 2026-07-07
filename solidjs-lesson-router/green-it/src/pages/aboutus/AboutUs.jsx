import "./AboutUs.css";
export default function AboutUs() {
  return (
    <>
      <section class="section">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <img
                src="/images/audi-history.avif"
                alt="Audi-history"
                class="optimized-image-size"
              />
            </div>
            <div class="column is-6 has-text-centered">
              <h2 class="title is-2">Historique de la marque</h2>
              <p>
                August Horch a fondé Audi en 1909. Suite à sa fusion avec Horch,
                Wanderer et DKW en 1932, Audi est devenue Auto Union AG.
                Volkswagen a acquis Audi en 1994, et aujourd'hui, la marque est
                connue pour son innovation, sa qualité et sa performance en tant
                que marque automobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container mt-4 mb-4">
          <div class="columns is-vcentered">
            <div class="column is-6 ">
              <h2 class="title is-2 has-text-left">Présentation de l'équipe</h2>
              <p>
                Voici l'équipe clé d'Audi, composée de membres de la direction,
                d'ingénieurs et de designers, qui travaillent ensemble pour
                faire progresser l'entreprise dans la transformation numérique
                et l'électrification de la gamme de modèles.
              </p>
            </div>
            <div class="column is-6">
              <img
                src="/images/audiMember.avif"
                alt="Audi-member"
                loading="lazy"
                class="optimized-image-size"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="landing-page">
        <section class="section has-background-black">
          <div class="container mt-4 mb-4">
            <div class="columns is-vcentered">
              <div class="column is-6">
                <img
                  src="/images/audi-eolienne.avif"
                  alt="Audi eco"
                  loading="lazy"
                  class="optimized-image-size"
                />
              </div>
              <div class="column is-6">
                <h2 class="title is-2 has-text-left has-text-white">
                  Engagements sociaux et environnementaux
                </h2>
                <p className="has-text-white">
                  Audi considère que la durabilité consiste à avoir une
                  responsabilité envers l'avenir en équilibrant les aspects
                  économiques, écologiques et sociaux. La transparence,
                  l'intégrité et une vision à long terme sont également des
                  éléments importants pour Audi. En adoptant une attitude
                  responsable, Audi aspire à être un leader en matière de
                  durabilité.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="container mt-4 mb-4">
            <div class="columns is-vcentered">
              <div class="column is-6 ">
                <h2 class="title is-2 has-text-left">Contact</h2>
                <p>
                  Peu importe où vous êtes dans le monde, notre service
                  clientèle vous aidera pour toute question ou demande
                  concernant Audi. Il suffit de sélectionner le pays ou la
                  région de vente correspondante dans le menu ci-dessous. Nos
                  employés seront heureux de vous aider.
                </p>
              </div>
              <div class="column is-6">
                <img
                  src="/images/audi-contact.avif"
                  alt="Audi-contact"
                  loading="lazy"
                  class="optimized-image-size"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
