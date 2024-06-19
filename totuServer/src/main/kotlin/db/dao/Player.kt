package space.junodev.db.dao

import com.google.protobuf.util.JsonFormat
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import space.junodev.db.fromJsonString
import space.junodev.db.table.BoardConfigurations
import space.junodev.db.table.Players
import space.junodev.db.toJsonString
import space.junodev.model.game.CardOuterClass.Card
import space.junodev.model.game.SiteOuterClass.Site
import java.util.*

class Player(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<Player>(Players)

    var name by Players.name
    var power by Players.power
    var influence by Players.influence
    var tokens by Players.tokens
    var gameId by Players.gameId

    var deck: List<Card>
        get() {
            val jsonString = deckJson
            return jsonString.split(",").map { json ->
                Card.newBuilder().fromJsonString(json).build() as Card
            }
        }
        set(value) {
            deckJson = value.joinToString(",") { it.toJsonString() }
        }

    var hand: List<Card>
        get() {
            val jsonString = handJson
            return jsonString.split(",").map { json ->
                Card.newBuilder().fromJsonString(json).build()
            }
        }
        set(value) {
            handJson = value.joinToString(",") { it.toJsonString() }
        }

    var play: List<Card>
        get() {
            val jsonString = playJson
            return jsonString.split(",").map { json ->
                Card.newBuilder().fromJsonString(json).build()
            }
        }
        set(value) {
            playJson = value.joinToString(",") { it.toJsonString() }
        }

    var discard: List<Card>
        get() {
            val jsonString = discardJson
            return jsonString.split(",").map { json ->
                Card.newBuilder().fromJsonString(json).build()
            }
        }
        set(value) {
            discardJson = value.joinToString(",") { it.toJsonString() }
        }

    var innerCircle: List<Card>
        get() {
            val jsonString = innerCircleJson
            return jsonString.split(",").map { json ->
                Card.newBuilder().fromJsonString(json).build()
            }
        }
        set(value) {
            innerCircleJson = value.joinToString(",") { it.toJsonString() }
        }

    private var deckJson by Players.deck
    private var handJson by Players.hand
    private var playJson by Players.play
    private var discardJson by Players.discard
    private var innerCircleJson by Players.innerCircle
}
