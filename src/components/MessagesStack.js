import { useDispatch, useSelector } from "react-redux"
import { selectInteractionMsg, setInteractionMsg } from "../features/RobotSlice.js"

import './Message.css'
import { Message } from "./Message.js"

export const MessagesStack = () => {
    const dispatch = useDispatch()
    const messages = useSelector(selectInteractionMsg)

    return (
        <div className="messages-stack">
            <button onClick={() => dispatch(setInteractionMsg("Messaggion di prova"))}>Aggiungi</button>
            {messages.map((msg, i) => {
                return <Message key={`message-${i}`} msg={msg.msg} date={msg.date} />
            })}
        </div>
    )
}