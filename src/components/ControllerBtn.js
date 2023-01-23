export const ControllerBtn = ({ icon, onClick, className }) => {

    return (
        <button className={`controller-btn ${className || ""}`} onMouseDown={onClick}>{icon}</button>
    )
}