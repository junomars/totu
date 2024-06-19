package space.junodev.handlers

import io.ktor.websocket.*
import space.junodev.model.message.GameMessageOuterClass.GameMessage
import space.junodev.model.message.PlayerSessionOuterClass.PlayerSession

class UnknownMessageHandler : GameMessageHandler {
    override fun canHandle(type: GameMessage): Boolean {
        return true
    }

    override suspend fun handle(
        session: DefaultWebSocketSession,
        playerSession: PlayerSession,
        message: GameMessage
    ) {
        session.send("Not handling messages at this time.")
        session.send("Session info: $playerSession")
    }

}
