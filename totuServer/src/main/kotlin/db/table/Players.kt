package space.junodev.db.table

import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import space.junodev.db.dao.Game
import space.junodev.db.dao.Player

object Players : UUIDTable() {
    val name = varchar("name", 255)
    val power = integer("power")
    val influence = integer("influence")
    val deck = text("deck")
    val hand = text("hand")
    val play = text("play")
    val discard = text("discard")
    val innerCircle = text("inner_circle")
    val tokens = integer("tokens")
    val gameId = reference("game_id", Games, onDelete = ReferenceOption.CASCADE)

    fun createPlayer(playerName: String, game: Game): Player {
        var player: Player? = null
        transaction {
            player = Player.new {
                name = playerName
                power = 0
                influence = 0
                deck = listOf()
                hand = listOf()
                play = listOf()
                discard = listOf()
                innerCircle = listOf()
                tokens = 0
                gameId = game.id
            }
        }

        return player!!
    }
}
