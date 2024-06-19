package space.junodev.handlers

import io.ktor.websocket.*
import space.junodev.db.dao.Game
import space.junodev.model.message.GameMessageOuterClass.GameMessage
import space.junodev.model.message.PlayerSessionOuterClass.PlayerSession

class MessageHandlerFactory {
    private val handlers = listOf<GameMessageHandler>(
    )

    suspend fun handle(session: DefaultWebSocketSession, playerSession: PlayerSession, message: GameMessage) {
        handlers.find { it.canHandle(message) }?.handle(session, playerSession, message)
            ?: UnknownMessageHandler().handle(session, playerSession, message)
    }
}