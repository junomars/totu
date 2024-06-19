package space.junodev.plugins

import io.ktor.serialization.kotlinx.*
import io.ktor.server.application.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import io.ktor.server.websocket.*
import kotlinx.serialization.json.Json
import space.junodev.routes.boardConfigurationRouting
import space.junodev.routes.gameCreationRouting
import space.junodev.routes.gameRouting
import java.time.Duration

fun Application.configureRouting() {
    routing {
        this@configureRouting.install(WebSockets) {
            contentConverter = KotlinxWebsocketSerializationConverter(Json)
            pingPeriod = Duration.ofSeconds(15)
            timeout = Duration.ofSeconds(15)
            maxFrameSize = Long.MAX_VALUE
            masking = false
        }
        this@configureRouting.install(Sessions) {
            cookie<String>("SESSION") {
                cookie.path = "/"
                cookie.maxAgeInSeconds = 14400
            }
        }
        boardConfigurationRouting()
        gameCreationRouting()
        gameRouting()
    }
}