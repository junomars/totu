package space.junodev.routes

import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.consumeEach
import kotlinx.serialization.json.Json
import space.junodev.db.dao.Game
import space.junodev.exception.GameNotFoundException
import space.junodev.exception.SessionNotFoundException
import space.junodev.handlers.MessageHandlerFactory
import space.junodev.model.message.GameMessageOuterClass.*
import space.junodev.model.message.PlayerSessionOuterClass.PlayerSession
import space.junodev.service.GameRoomManager
import java.util.*

fun Route.gameRouting(gameRoomManager: GameRoomManager) {
    webSocket("/game/{gameId?}") {
        val messageHandlerFactory = MessageHandlerFactory()
        val playerSession = call.sessions.get<PlayerSession>() ?: throw SessionNotFoundException("No session found.")

        var game: Game? = null
        try {
            game = gameRoomManager.getGameRoom(UUID.fromString(playerSession.gameId))
        } catch (e: GameNotFoundException) {
            close(CloseReason(CloseReason.Codes.CANNOT_ACCEPT, "Game not found"))
        }

        this.incoming.consumeEach { frame ->
            if (frame is Frame.Text && game != null) {
                val text = frame.readText()
                val message = Json.decodeFromString<GameMessage>(text)
                messageHandlerFactory.handle(this, playerSession, message)
            }
        }
    }
}