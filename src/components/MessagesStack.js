import { useDispatch, useSelector } from "react-redux"
import { changeMode, resetInteractionMsg, selectInteractionMsg } from "../features/RobotSlice.js"

import './style/Message.css'
import { Message } from "./Message.js"

// Componente che racchiude le notifiche all'utente
export const MessagesStack = () => {
    const dispatch = useDispatch()
    const messages = useSelector(selectInteractionMsg)

    return (
        <div className="messages-stack">
            {messages.map((msg, i) => {
                return (
                  <Message
                    key={`message-${i}`}
                    msg={msg}
                    onClick={msg.mode ? () => dispatch(changeMode(msg.mode)) : msg.mode}
                    onClose={() => dispatch(resetInteractionMsg(msg.id))}
                  />
                );
            })}
        </div>
    )
}