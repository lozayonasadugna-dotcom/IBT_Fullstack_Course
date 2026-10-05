import PropTypes from "prop-types";

export function Card({ children }) {
  return (
    <div
      className="card"
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        margin: "8px 0",
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};