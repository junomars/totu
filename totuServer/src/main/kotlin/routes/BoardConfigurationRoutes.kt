package space.junodev.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.slf4j.LoggerFactory
import space.junodev.db.table.BoardConfigurations

fun Route.boardConfigurationRouting() {
    val log = LoggerFactory.getLogger(this.javaClass)
    route("/boards") {
        get {
            log.info("Get all boards")
            try {
                var boardNames = listOf<String>()
                transaction {
                    boardNames = BoardConfigurations.selectAll().map {
                        val gameExpansion = it[BoardConfigurations.map]
                        val playerCount = it[BoardConfigurations.playerCount]
                        val gameOrientation = it[BoardConfigurations.gameOrientation]

                        if (playerCount == 3) {
                            "${gameExpansion}_${playerCount}_${gameOrientation}"
                        } else {
                            "${gameExpansion}_${playerCount}"
                        }
                    }.toList()
                }
                call.respond(HttpStatusCode.OK, boardNames)
            } catch (e: Exception) {
                log.error("Failed to get all boards", e)
                call.respond(HttpStatusCode.NotFound, "No boards found.")
            }
        }
    }
}