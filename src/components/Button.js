export const Button = ({ btnName, onClick, active }) => {
    return (
        <div className={`title ${active ? "active" : ""}`} onClick={onClick}>{btnName}</div>
    )
}