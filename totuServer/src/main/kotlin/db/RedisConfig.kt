package space.junodev.db

import io.lettuce.core.RedisClient
import io.lettuce.core.api.StatefulRedisConnection
import io.lettuce.core.api.async.RedisAsyncCommands
import io.lettuce.core.api.reactive.RedisReactiveCommands
import io.lettuce.core.api.sync.RedisCommands
import io.lettuce.core.pubsub.StatefulRedisPubSubConnection
import io.lettuce.core.pubsub.api.async.RedisPubSubAsyncCommands
import io.lettuce.core.pubsub.api.reactive.RedisPubSubReactiveCommands
import io.lettuce.core.pubsub.api.sync.RedisPubSubCommands
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import reactor.core.publisher.Mono
import java.util.*

object RedisConfig {
    private val client = RedisClient.create("redis://localhost:6379")
    private val connection: StatefulRedisConnection<String, String> = client.connect()
    private val pubSubConnection: StatefulRedisPubSubConnection<String, String> = client.connectPubSub()
    val commands: RedisReactiveCommands<String, String> = connection.reactive()
    val pubSubCommands: RedisPubSubReactiveCommands<String, String> = pubSubConnection.reactive()

    fun <T> withCommands(block: (RedisReactiveCommands<String, String>) -> Mono<T>): Mono<T> {
        return block(commands)
    }
}