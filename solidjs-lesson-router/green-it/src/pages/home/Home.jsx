import Header from "./Header";
import "./home.css";
import { latestCars } from "../../database/data";
function Home() {
  return (
    <>
      <Header />

      <section class="section">
        <div class="container mt-4 mb-4">
          <div class="columns is-vcentered">
            <div class="column is-6 ">
              <h2 class="title is-2 has-text-left">
                Prenez le contrôle avec Audi
              </h2>
              <p>
                Lorsque vous entrez dans une Audi, vous prenez le contrôle. Et
                rien ne symbolise cela mieux que le volant. Avec sa forme
                ergonomique et ses commandes intuitives, le volant d'Audi vous
                offre une expérience de conduite inégalée. Vous pouvez vous
                concentrer sur la route tout en gardant le contrôle total de
                votre Audi grâce à ce volant exceptionnel.
              </p>
            </div>
            <div class="column is-6">
              <img
                src="/images/volant.avif"
                alt="Your image"
                loading="lazy"
                class="optimized-image-size"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <img
                src="/images/Responsabilite-Sociale.avif"
                alt="Your image"
                loading="lazy"
                class="optimized-image-size"
              />
            </div>
            <div class="column is-6 has-text-centered">
              <h2 class="title is-2">
                La responsabilité sociale au coeur du design Audi
              </h2>
              <p>
                Le futur nous anime, la durabilité aussi. Chez Audi, nous
                envisageons le design comme un outil nécessaire pour relever les
                grands défis mondiaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section has-background-black">
        <div class="container mt-4 mb-4">
          <div class="columns is-vcentered">
            <div class="column is-6 ">
              <h2 class="title is-2 has-text-left has-text-white">
                La recharge de votre Audi électrique simplifiée
              </h2>
              <p className="has-text-white">
                {" "}
                Audi vous offre des solutions de recharge sur-mesure. Accédez à
                l’un des plus vastes réseaux de recharge publique en Europe avec
                la carte Audi charging et profitez des avantages d’une borne
                installée à domicile avec ZEborne ou en entreprise avec Zeplug.
              </p>
            </div>
            <div class="column is-6">
              <img
                src="/images/recharge.avif"
                alt="Your image"
                class="optimized-image-size"
              />
            </div>
          </div>
        </div>

        <div class="container mt-4 mb-4">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <img
                src="/images/myAudi.avif"
                alt="Your image"
                class="optimized-image-size"
              />
            </div>
            <div class="column is-6">
              <h2 class="title is-2 has-text-left has-text-white">
                Un univers de privilèges pour les passionnés d’Audi
              </h2>
              <p className="has-text-white">
                {" "}
                myAudi vous fait vivre une relation privilégiée avec Audi grâce
                à un ensemble de services exclusifs pour profiter pleinement de
                toutes les fonctionnalités connectées de votre Audi.
              </p>
            </div>
          </div>
        </div>

        <div class="container mt-4 mb-4">
          <div class="columns is-vcentered">
            <div class="column is-6 ">
              <h2 class="title is-2 has-text-left has-text-white">
                La recharge rapide de votre voiture électrique
              </h2>
              <p className="has-text-white">
                Audi a développé des batteries plus performantes, des systèmes
                de refroidissement innovants et des solutions de recharge
                ultra-rapides pour accélérer le temps de charge de votre voiture
                électrique Audi
              </p>
            </div>
            <div class="column is-6">
              <video width="640" height="360" muted controls preload="none">
                <source
                  src="/videos/Audi_TempsCharge_30sec_16x9_1.webm"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="section my-3">
        <div className="container">
          <h2 className="title is-2 has-text-centered">Trouver votre Audi</h2>
          <div className="columns is-multiline">
            <div className="column is-one-third mb-3">
              <div className="card-rounded">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="/images/A1BACK.avif"
                      alt="Audi A1"
                      style={{ "max-height": "600px", width: "auto" }}
                      loading="lazy"
                    />
                  </figure>
                </div>
                <div className="small-image">
                  <figure className="image">
                    <img
                      src="/images/A1side.avif"
                      alt="Small Image"
                      loading="lazy"
                      class="car-card-image"
                    />
                  </figure>
                </div>
                <div className="card-content" style={{ "margin-top": "-40px" }}>
                  <div className="content">
                    <h3 className="title is-3 has-text-white is-relative">
                      Audi A1
                    </h3>
                    <a href="/confirmation" className="button is-primary is-inverted is-outlined">
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="card-rounded">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="/images/backA3.avif"
                      alt="Audi Q5"
                      style={{ "max-height": "600px", width: "auto" }}
                    />
                  </figure>
                  <div className="small-image">
                    <figure className="image">
                      <img
                        src="/images/A3side.avif"
                        alt="Small Image"
                        loading="lazy"
                        class="car-card-image"
                      />
                    </figure>
                  </div>
                </div>
                <div className="card-content" style={{ "margin-top": "-40px" }}>
                  <div className="content">
                    <h3 className="title is-3 has-text-white is-relative">
                      Audi A3
                    </h3>
                    <a href="/confirmation" className="button is-primary is-inverted is-outlined">
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-one-third">
              <div className="card-rounded">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src="/images/inconueback.avif"
                      alt="Audi A8"
                      style={{ "max-height": "600px", width: "auto" }}
                      loading="lazy"
                    />
                  </figure>
                  <div className="small-image">
                    <figure className="image">
                      <img
                        src="/images/sideinconnue.avif"
                        alt="Small Image"
                        loading="lazy"
                        class="car-card-image"
                      />
                    </figure>
                  </div>
                </div>
                <div className="card-content" style={{ "margin-top": "-40px" }}>
                  <div className="content">
                    <h3 className="title is-3 has-text-white is-relative">
                      Audi A8
                    </h3>

                    <a href="/confirmation" className="button is-primary is-inverted is-outlined">
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
