package space.junodev.db.dao

import org.jetbrains.exposed.dao.*
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.transactions.transaction
import space.junodev.db.fromJsonString
import space.junodev.db.table.BoardConfigurations
import space.junodev.db.table.Games
import space.junodev.db.table.GameEvents
import space.junodev.db.table.Players
import space.junodev.db.toJsonString
import space.junodev.model.game.BoardOuterClass.Board
import space.junodev.model.game.RouteOuterClass.Route
import java.util.*

class Game(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<Game>(Games)

    var gameStatus by Games.gameStatus
    var currentPlayer by Player optionalReferencedOn Games.currentPlayer
    var winner by Player optionalReferencedOn Games.winner
    var createdAt by Games.createdAt
    var updatedAt by Games.updatedAt
    val players by Player referrersOn Players.gameId
    val events by GameEvent referrersOn GameEvents.gameId

    var board: Board
        get() {
            return Board.newBuilder().fromJsonString(boardJson).build() as Board
        }
        set(value) {
            boardJson = value.toJsonString()
        }
    private var boardJson by Games.board
}
