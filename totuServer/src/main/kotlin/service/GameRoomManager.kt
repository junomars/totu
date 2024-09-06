package space.junodev.service

import io.ktor.websocket.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import space.junodev.db.RedisConfig
import space.junodev.db.dao.BoardConfiguration
import space.junodev.db.dao.Game
import space.junodev.exception.GameNotFoundException
import space.junodev.model.game.BoardOuterClass.Board
import space.junodev.model.game.GameStatusOuterClass.GameStatus
import java.time.LocalDateTime
import java.util.*

class GameRoomManager(val redisHost: String, val redisPort: Int) {
    private val gameRooms = mutableMapOf<UUID, Game>()
    private val webSocketSessions = mutableMapOf<UUID, MutableList<DefaultWebSocketSession>>()
//    private val redisConfig = RedisConfig(redisHost, redisPort)

    fun createGame(boardConfiguration: BoardConfiguration): Mono<Game> {
        return Mono.fromCallable {
            val initialBoard = Board.newBuilder()
                .addAllSites(boardConfiguration.sites)
                .addAllRoutes(boardConfiguration.routes)
                .build()
            val game = Game.new {
                gameStatus = GameStatus.WAITING_FOR_PLAYERS
                currentPlayer = null
                winner = null
                board = initialBoard
                createdAt = LocalDateTime.now()
                updatedAt = LocalDateTime.now()
            }
            gameRooms[game.id.value] = game
            game
        }
//            .publishOn(Schedulers.boundedElastic())
//            .flatMap { game ->
//                saveGameToRedis(game).thenReturn(game)
//            }.doOnSuccess { game ->
//                subscribeToGameRoom(game.id.value)
//            }
    }

    fun getGameRoom(gameId: UUID): Game {
        return gameRooms[gameId] ?: throw GameNotFoundException("Game $gameId not found!")
    }

    fun registerSession(gameId: UUID, session: DefaultWebSocketSession) {
        val sessions = webSocketSessions.getOrPut(gameId) { mutableListOf() }
        sessions.add(session)
    }

    fun unregisterSession(gameId: UUID, session: DefaultWebSocketSession) {
        val sessions = webSocketSessions[gameId] ?: return
        sessions.remove(session)
        if (sessions.isEmpty()) {
            webSocketSessions.remove(gameId)
        }
    }
}