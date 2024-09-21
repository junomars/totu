plugins {
    kotlin("jvm") version "1.9.22" apply false
    id("io.ktor.plugin") version "2.3.9" apply false
    id("pl.allegro.tech.build.axion-release") version "1.18.7"
}

group = "space.junodev"
version = scmVersion.version

scmVersion {
    tag {
        prefix = "totu"
    }
}

repositories {
    mavenCentral()
}

subprojects {
    repositories {
        mavenCentral()
    }

    apply(plugin = "org.jetbrains.kotlin.jvm")
}
