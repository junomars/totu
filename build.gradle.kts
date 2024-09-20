plugins {
    kotlin("jvm") version "1.9.22" apply false
    id("io.ktor.plugin") version "2.3.9" apply false
}

group = "space.junodev"
version = "0.1.0"

repositories {
    mavenCentral()
}

subprojects {
    repositories {
        mavenCentral()
    }

    apply(plugin = "org.jetbrains.kotlin.jvm")
}