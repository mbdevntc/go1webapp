import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { decrementTime } from "../features/RobotSlice.js"

// Componente di notifica per l'utente, utilizzato ad esempio nel caso si tenti di eseguire un
// comando che non combacia con la modalità richiesta per eseguirlo o se si tenta di inviare
// dei comandi al cane robot quanto questo non è collegato
export const Message = ({ msg, onClick, onClose }) => {
    const dispatch = useDispatch()

    // Per via di come funziona React, il tempo rimanente per la visualizzazione
    // della notifica viene decrrementato con un setInterval che va a modificare
    // l'oggetto 'notifica' presente nello stato dell'applicazione (store)
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(decrementTime(msg.id))
        }, 1000)
        return () => clearInterval(intervalId)
    }, [msg.id, dispatch])
    
    // Elimino la notifica quando il tempo scade
    useEffect(() => {
        const remainingTime = msg.secondsRemaining
        const timeoutId = setTimeout(() => {
            onClose()
        }, remainingTime * 1000)
        return () => clearTimeout(timeoutId)
    }, [onClose, msg.secondsRemaining])

    const handleAcceptAndClose = () => {
        onClick()
        onClose()
    }

    return (
        <div className="message">
            <div className="message-info">
                <div>{msg.date}</div>
                <button className="btn-sm" aria-label="Close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="message-description fw-semibold">
                <div className="text">{msg.msg}</div>
            </div>
            <div className="message-interaction">
                <div className="buttons">
                    {onClick && 
                        <>
                            <button className="btn cl-white bg-first" onClick={handleAcceptAndClose}>Accetta</button>
                            <button className="btn cl-white bg-alert" onClick={onClose}>Rifiuta</button>
                        </>
                    }
                </div>
                <div className="cl-gray">{msg.secondsRemaining}</div>
            </div>
        </div>
    )
}
