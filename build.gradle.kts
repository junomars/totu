plugins {
    kotlin("jvm") apply false
    id("io.ktor.plugin") apply false
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