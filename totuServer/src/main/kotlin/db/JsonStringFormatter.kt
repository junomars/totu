package space.junodev.db

import com.google.protobuf.Message
import com.google.protobuf.util.JsonFormat

fun <T : Message> T.toJsonString(): String {
    val printer = JsonFormat.printer().omittingInsignificantWhitespace()
    return printer.print(this)
}

fun <T : Message.Builder> T.fromJsonString(json: String): T {
    val parser = JsonFormat.parser()
    parser.merge(json, this)
    return this
}