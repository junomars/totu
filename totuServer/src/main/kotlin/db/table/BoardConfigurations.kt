package space.junodev.db.table

import org.jetbrains.exposed.dao.id.UUIDTable
import space.junodev.model.game.GameOrientationOuterClass.*

object BoardConfigurations : UUIDTable() {
    val map = varchar("map", 255)
    val playerCount = integer("playerCount")
    val gameOrientation = enumeration("orientation", GameOrientation::class)
    val sites = text("sites")
    val routes = text("routes")
}
