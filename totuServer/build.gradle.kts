plugins {
    application
    kotlin("jvm")
    id("io.ktor.plugin")
    kotlin("plugin.serialization") version "1.9.0"
}

group = "space.junodev"
version = "0.0.1"

repositories {
    mavenCentral()
}

application {
    mainClass.set("space.junodev.ApplicationKt")
}

val exposedVersion: String by project
val h2Version: String by project

configurations.all {
    exclude(group = "org.slf4j", module = "slf4j-log4j12")
    exclude(group = "org.slf4j", module = "slf4j-jdk14")
    exclude(group = "org.slf4j", module = "slf4j-jcl")
    exclude(group = "org.slf4j", module = "slf4j-simple")
    exclude(group = "ch.qos.logback", module = "logback-classic")
}

dependencies {
    implementation(project(":totuModel"))

    // ktor
    implementation("io.ktor:ktor-server-cors")
    implementation("io.ktor:ktor-server-core")
    implementation("io.ktor:ktor-server-sessions")
    implementation("io.ktor:ktor-server-netty")
    implementation("io.ktor:ktor-server-content-negotiation")
    implementation("io.ktor:ktor-serialization-kotlinx-json")
    implementation("io.ktor:ktor-server-freemarker")
    implementation("io.ktor:ktor-server-websockets-jvm")
    implementation("io.ktor:ktor-server-host-common-jvm")

    // serde
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.5.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:1.4.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.4.0")
    compileOnly("com.google.protobuf:protobuf-kotlin:3.21.7")
    implementation("com.google.protobuf:protobuf-java:3.21.12")
    implementation("com.google.protobuf:protobuf-java-util:3.21.12")

    // logging
    implementation("org.slf4j:slf4j-nop:2.0.7")
//    implementation("org.apache.logging.log4j:log4j-slf4j-impl:2.23.1")
    implementation("org.apache.logging.log4j:log4j-core:2.23.1")
    implementation("org.apache.logging.log4j:log4j-api-kotlin:1.4.0")

    // inmemory db
    implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-dao:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-json:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-java-time:$exposedVersion")
    implementation("com.h2database:h2:$h2Version")

    // db
    implementation("org.postgresql:postgresql:42.7.4")
    implementation("io.lettuce:lettuce-core:6.4.0.RELEASE")

    // testing
    testImplementation(kotlin("test"))
    testImplementation("io.ktor:ktor-server-tests-jvm")
    testImplementation("io.ktor:ktor-server-test-host-jvm:2.3.9")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5:1.9.22")
}

tasks.test {
    useJUnitPlatform()
}