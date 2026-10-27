import { FaHeart, FaRegHeart } from "react-icons/fa"; // filled / outline heart

function SkillCard({ skill, fit, liked, inWeek, onLike, onAdd, onRemove }) {
  // A link that searches YouTube for this skill. encodeURIComponent turns
  // spaces and symbols into a form that is safe inside a web address.
  const videoLink =
    "https://www.youtube.com/results?search_query=" +
    encodeURIComponent(skill.title + " tutorial for beginners");

  return (
    <div className="skill-card">
      <div className="skill-top">
        <h2>{skill.title}</h2>
        <button
          className={liked ? "heart-btn liked" : "heart-btn"}
          onClick={onLike}
          aria-label={liked ? "Unlike " + skill.title : "Like " + skill.title}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <p className="tags-row">
        <span className="tag">{skill.tag}</span>
        <span className="tag">{skill.type}</span>
        <span className="tag">{skill.hoursPerWeek} hrs/week</span>
      </p>

      <p className={fit.good ? "pill good" : "pill bad"}>
        {fit.good ? "Good fit" : "Bad fit right now"}
      </p>

      <ul className="reasons">
        {fit.reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>

      <div className="skill-actions">
        <a className="add-btn" href={videoLink} target="_blank" rel="noreferrer">
          Watch videos →
        </a>
        {inWeek ? (
          <button className="add-btn" onClick={onRemove}>
            Remove from my week
          </button>
        ) : (
          <button className="add-btn" disabled={!fit.fitsTime} onClick={onAdd}>
            Add to my week
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillCard;
