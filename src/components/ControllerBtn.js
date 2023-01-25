export const ControllerBtn = ({ icon, onMouseDown, onMouseUp, className }) => {

    return (
      <button
        className={`controller-btn ${className || ""}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {icon}
      </button>
      // <button className={`controller-btn ${className || ""}`} onMouseEnter={onMouseDown} onMouseLeave={onMouseUp}>{icon}</button>
    );
}