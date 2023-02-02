export const ControllerBtn = ({ icon, onMouseDown, onMouseUp, className }) => {

    return (
      <button
        className={`controller-btn ${className || ""}`}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {icon}
      </button>
    );
}