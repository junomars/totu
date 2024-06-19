package space.junodev.db.table

import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.datetime
import org.jetbrains.exposed.sql.json.json
import space.junodev.model.game.GameActionOuterClass.*

object GameEvents : UUIDTable() {
    val gameId = reference("game_id", Games, onDelete = ReferenceOption.CASCADE)
    val playerId = reference("player_id", Players, onDelete = ReferenceOption.CASCADE)
    val timestamp = datetime("timestamp")
    val gameAction = text("game_action")
}
