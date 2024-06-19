package space.junodev.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import org.apache.logging.log4j.kotlin.logger
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.transactions.transaction
import space.junodev.db.dao.BoardConfiguration
import space.junodev.db.dao.Game
import space.junodev.db.dao.Player
import space.junodev.db.table.BoardConfigurations.gameOrientation
import space.junodev.db.table.BoardConfigurations.map
import space.junodev.db.table.BoardConfigurations.playerCount
import space.junodev.db.table.Players
import space.junodev.exception.BoardConfigurationNotFound
import space.junodev.model.message.GameMessageOuterClass.GameMessage
import space.junodev.model.message.PlayerSessionOuterClass.PlayerSession
import space.junodev.service.GameRoomManager

fun Route.gameCreationRouting() {
    route("/games") {
        get {
            try {
                val games = transaction {
                    Game.all()
                }.toList()
                call.respond(HttpStatusCode.OK, games)
            } catch (e: Throwable) {
                call.respond(HttpStatusCode.NotFound, "Games not found")
            }
        }
    }
    route("/game") {
        post {
            val gameMessageRequest: GameMessage = call.receive<GameMessage>()
            var game: Game? = null
            var player: Player? = null

            transaction {
                val boardConfiguration = BoardConfiguration.find {
                    (map eq gameMessageRequest.createGameRequest.map) and
                            (playerCount eq gameMessageRequest.createGameRequest.playerCount) and
                            (gameOrientation eq gameMessageRequest.createGameRequest.gameOrientation)
                }.singleOrNull() ?: throw BoardConfigurationNotFound("Board configuration not found")

                logger.info("Creating game with board configuration ${boardConfiguration.id.value}")
                game = GameRoomManager.createGame(boardConfiguration).block()
                logger.info("Created game with id ${game?.id?.value}")

                logger.info("Creating player with game ${game?.id?.value}")
                player = Players.createPlayer(gameMessageRequest.createGameRequest.playerName, game!!)
                logger.info("Created player with id ${player?.id?.value}")
            }

            val playerSession = PlayerSession.newBuilder()
                .setGameId(game?.id?.value.toString())
                .setPlayerId(player?.id?.value.toString())
                .build()

            call.sessions.set(playerSession)
            call.respond(HttpStatusCode.OK, playerSession)
        }
    }
}