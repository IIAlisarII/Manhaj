// The circle from your sketch: a ring that fills up as semesters are finished.
function ProgressRing({ done, total }) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    // style={{ "--pct": percent }} hands the number to the CSS (see .ring)
    <div className="ring" style={{ "--pct": percent }}>
      <div className="ring-inner">
        <strong>{percent}%</strong>
        <span>
          {done} of {total} done
        </span>
      </div>
    </div>
  );
}

export default ProgressRing;
