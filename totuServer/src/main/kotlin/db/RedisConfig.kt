package space.junodev.db

import io.ktor.server.config.*
import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.reactive.RedisReactiveCommands
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection
import io.lettuce.core.pubsub.api.reactive.RedisPubSubReactiveCommands
import reactor.core.publisher.Mono

class RedisConfig(val host: String, val port: Int) {
    private val client = RedisClient.create("redis://${host}:${port}")
    private val connection: StatefulRedisConnection<String, String> = client.connect()
    private val pubSubConnection: StatefulRedisPubSubConnection<String, String> = client.connectPubSub()
    val commands: RedisReactiveCommands<String, String> = connection.reactive()
    val pubSubCommands: RedisPubSubReactiveCommands<String, String> = pubSubConnection.reactive()

    fun <T> withCommands(block: (RedisReactiveCommands<String, String>) -> Mono<T>): Mono<T> {
        return block(commands)
    }
}