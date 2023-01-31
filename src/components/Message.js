export const Message = ({ msg, date, onClick, onClose }) => {

    return (
        <div className="message">
            <div className="message-info">
                <div className="message-date">{date}</div>
                <button className="close-button" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="message-description">{msg}</div>
            <div className="message-interaction">
                <button className="btn cl-white bg-first" onClick={onClick}>Accetta</button>
                <button className="btn cl-white bg-alert" onClick={onClose}>Rifiuta</button>
            </div>
        </div>
    )
}