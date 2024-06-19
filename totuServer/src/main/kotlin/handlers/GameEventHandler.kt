package space.junodev.handlers
//
//import io.ktor.websocket.*
//import kotlinx.serialization.encodeToString
//import kotlinx.serialization.json.Json
//import space.junodev.db.RedisConfig
//import space.junodev.model.message.GameMessageOuterClass.*
//import space.junodev.model.message.GameMessageTypeOuterClass.*
//import space.junodev.service.GameRoomManager
//
//class GameEventHandler : GameMessageHandler {
//    override fun canHandle(type: GameMessage): Boolean {
//        return type == GameMessageType.GAME_UPDATED
//    }
//
//    override suspend fun handle(message: GameMessage): GameMessage {
//        return GameMessage(
//            GameMessageType.ERROR,
//            LogMessage("Game event cannot be handled in this manner")
//        )
//    }
//
//    override suspend fun handle(session: DefaultWebSocketSession, gameId: String, message: GameMessage) {
//        val gameEvent = message.payload as GameEvent
//        val game = gameEvent.game
//
//        // Update the game state based on the event
//        updateGameState(game, gameEvent)
//
//        // Save the updated game state to Redis
//        GameRoomManager.saveGameToRedis(game)
//
//        // Notify all subscribers about the updated state
//        RedisConfig.pubSubCommands.publish("game:${game.id.value}", Json.encodeToString(game))
//    }
//
//    private fun updateGameState(game: Game, gameEvent: GameEvent) {
//
//    }
//}