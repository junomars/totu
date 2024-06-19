package space.junodev.db.dao

import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import space.junodev.db.fromJsonString
import space.junodev.db.table.GameEvents
import space.junodev.model.game.GameActionOuterClass.GameAction
import java.util.*

class GameEvent(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<GameEvent>(GameEvents)

    val playerId by Player referencedOn GameEvents.playerId
    val timestamp by GameEvents.timestamp
    val gameId by Game referencedOn GameEvents.gameId

    val gameAction: GameAction
        get() {
            return GameAction.newBuilder().fromJsonString(gameActionJson).build() as GameAction
        }
    private var gameActionJson by GameEvents.gameAction
}
