import { useNavigate } from "@solidjs/router";

export default function ReservationModal({ handleClose }) {
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation");
  };
  return (
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Réserver</p>
          <button
            class="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Prénom</label>
            <div class="control">
              <input class="input" type="text"  />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="email"  />
            </div>
          </div>
          <div class="field">
            <label class="label">Téléphone</label>
            <div class="control">
              <input class="input" type="tel" />
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" onClick={onSubmit}>
            Valider
          </button>
          <button class="button" onClick={handleClose}>
            Annuler
          </button>
        </footer>
      </div>
    </div>
  );
}
