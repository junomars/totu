package space.junodev.db.table

import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.id.UUIDTable
import org.jetbrains.exposed.sql.ReferenceOption
import org.jetbrains.exposed.sql.javatime.datetime
import space.junodev.model.game.GameStatusOuterClass.*

object Games : UUIDTable() {
    val gameStatus = enumeration("game_status", GameStatus::class)
    val currentPlayer = reference("current_player", Players, onDelete = ReferenceOption.SET_NULL).nullable()
    val winner = reference("winner", Players, onDelete = ReferenceOption.SET_NULL).nullable()
    val board = text("board")
    val createdAt = datetime("created_at")
    val updatedAt = datetime("updated_at")

}
