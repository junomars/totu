package space.junodev.plugins

import io.ktor.server.application.*
import space.junodev.db.H2Db

fun Application.configureDatabases() {
    H2Db.init()
}