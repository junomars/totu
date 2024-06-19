package space.junodev.db.dao

import org.jetbrains.exposed.dao.UUIDEntity
import org.jetbrains.exposed.dao.UUIDEntityClass
import org.jetbrains.exposed.dao.id.EntityID
import space.junodev.db.fromJsonString
import space.junodev.db.table.BoardConfigurations
import space.junodev.db.toJsonString
import space.junodev.model.game.GameOrientationOuterClass
import space.junodev.model.game.RouteOuterClass.*
import space.junodev.model.game.SiteOuterClass.*
import java.util.*


class BoardConfiguration(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<BoardConfiguration>(BoardConfigurations)

    var map: String by BoardConfigurations.map
    var playerCount: Int by BoardConfigurations.playerCount
    var gameOrientation: GameOrientationOuterClass.GameOrientation by BoardConfigurations.gameOrientation
    var sites: List<Site>
        get() {
            val jsonString = sitesJson
            return jsonString.split(",").map { json ->
                Site.newBuilder().fromJsonString(json).build() as Site
            }
        }
        set(value) {
            sitesJson = value.joinToString(",") { it.toJsonString() }
        }
    var routes: List<Route>
        get() {
            val jsonString = routesJson
            return jsonString.split(",").map { json ->
                Route.newBuilder().fromJsonString(json).build() as Route
            }
        }
        set(value) {
            routesJson = value.joinToString(",") { it.toJsonString() }
        }
    private var sitesJson by BoardConfigurations.sites
    private var routesJson by BoardConfigurations.routes
}