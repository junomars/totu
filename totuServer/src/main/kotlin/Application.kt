package space.junodev

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.cors.routing.*
import space.junodev.plugins.configureDatabases
import space.junodev.plugins.configureRouting
import space.junodev.plugins.configureSerialization
import space.junodev.plugins.configureTemplating

fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    install(CORS) {
        allowHost("localhost:3000", schemes = listOf("http", "https"))
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.AccessControlAllowHeaders)

        allowSameOrigin = true
        allowNonSimpleContentTypes = true
    }
    configureSerialization()
    configureDatabases()
    configureRouting()
    configureTemplating()
}