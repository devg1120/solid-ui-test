export default function SectionLayout({
  image,
  title,
  description,
  button,
  positionImage,
}) {
  return (
    <>
      <div className="columns">
        {positionImage === "left" && (
          <div className="column is-two-thirds">
            <img src={image} alt={title} />
          </div>
        )}

        <div className="column">
          <h3 className="title is-3">{title}</h3>
          <p>{description}</p>
          <button className="button is-primary is-inverted is-outlined">
            {button}
          </button>
        </div>

        {positionImage === "right" && (
          <div className="column is-two-thirds">
            <img src={image} alt={title} />
          </div>
        )}
      </div>
    </>
  );
}
