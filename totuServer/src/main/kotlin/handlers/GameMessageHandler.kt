package space.junodev.handlers

import io.ktor.websocket.*
import space.junodev.db.dao.Game
import space.junodev.model.message.GameMessageOuterClass.GameMessage
import space.junodev.model.message.PlayerSessionOuterClass.PlayerSession

interface GameMessageHandler {
    fun canHandle(type: GameMessage): Boolean
    suspend fun handle(
        session: DefaultWebSocketSession,
        playerSession: PlayerSession,
        message: GameMessage)
}