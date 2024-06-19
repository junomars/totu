package space.junodev.db

import org.apache.logging.log4j.kotlin.Logging
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import space.junodev.db.dao.BoardConfiguration
import space.junodev.db.table.BoardConfigurations
import space.junodev.db.table.GameEvents
import space.junodev.db.table.Games
import space.junodev.db.table.Players
import space.junodev.model.game.BoardOuterClass.Board
import space.junodev.model.game.GameOrientationOuterClass.GameOrientation
import java.io.File
import java.io.FileNotFoundException

object H2Db : Logging {
    private val boardConfigurations = mutableSetOf<BoardConfiguration>()

    fun init() {
        logger.info("Creating a db")
        val driverClassName = "org.h2.Driver"
        val jdbcURL = "jdbc:h2:file:./build/db"
        val database = Database.connect(jdbcURL, driverClassName)
        transaction(database) {
            SchemaUtils.createMissingTablesAndColumns(BoardConfigurations)
            SchemaUtils.createMissingTablesAndColumns(GameEvents)
            SchemaUtils.createMissingTablesAndColumns(Games)
            SchemaUtils.createMissingTablesAndColumns(Players)
        }

        logger.info("Reading from file")
        val resourcesFolder = File(this::class.java.getResource("/sampleBoards")?.path ?: throw FileNotFoundException())
        val boardFiles = resourcesFolder.listFiles()
        val boards = boardFiles?.map { file ->
            file.nameWithoutExtension to Board.newBuilder().fromJsonString(file.readText()).build() as Board
        }

        if (boards.isNullOrEmpty()) {
            logger.warn("No files found.")
            return
        }

        val playerBoardMapping = listOf(
            arrayOf(GameOrientation.CENTER),
            arrayOf(GameOrientation.CENTER, GameOrientation.LEFT),
            arrayOf(GameOrientation.CENTER, GameOrientation.RIGHT),
            arrayOf(GameOrientation.CENTER, GameOrientation.LEFT, GameOrientation.RIGHT)
        )

        var count: Int
        var orientation: GameOrientation

        logger.info("Processing boards")
        for (board in boards) {
            for ((index, orientations) in playerBoardMapping.withIndex()) {
                when (index) {
                    0 -> {
                        count = 2
                        orientation = GameOrientation.CENTER
                    }

                    playerBoardMapping.lastIndex -> {
                        count = 4
                        orientation = GameOrientation.CENTER
                    }

                    else -> {
                        count = 3
                        orientation = orientations[1]
                    }
                }

                transaction {
                    if (!BoardConfigurations.selectAll()
                            .where {
                                (BoardConfigurations.map eq board.first)
                                    .and(BoardConfigurations.playerCount eq count)
                                    .and(BoardConfigurations.gameOrientation eq orientation)
                            }.empty()
                    ) {
                        logger.warn("${board.first}_${count}_${orientation} already exists, skipping addition to DB")
                        return@transaction
                    }

                    // Log the board config to add
                    logger.info("Adding ${board.first}_${count}_${orientation}")
                    val boardConfig = BoardConfiguration.new {
                        map = board.first
                        playerCount = count
                        gameOrientation = orientation
                        sites = board.second.sitesList
                        routes = board.second.routesList
                    }
                    boardConfigurations.add(boardConfig)
                }
            }
        }
    }
}
