import com.google.protobuf.gradle.id

plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.serialization") version "1.8.0"
    id("com.google.protobuf") version "0.9.4"
}

group = "space.junodev"
version = "0.1.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    implementation("io.grpc:grpc-kotlin-stub:1.3.0")
    implementation("io.grpc:grpc-protobuf:1.47.0")
    implementation("com.google.protobuf:protobuf-kotlin:3.21.7")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.5.1")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:1.5.1")
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:3.21.7"
    }
    plugins {
        create("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:1.47.0"
        }
        create("grpckt") {
            artifact = "io.grpc:protoc-gen-grpc-kotlin:1.3.0:jdk8@jar"
        }
        create("ts") {
            path = "node_modules/.bin/protoc-gen-ts_proto.cmd"
        }
    }
    generateProtoTasks {
        all().forEach { task ->
            task.plugins {
                create("grpc")
                create("grpckt")
                create("ts") {
                }
                id("kotlin")
            }
        }
    }
    sourceSets {
        main {
            proto {
                srcDir("src/main/proto")
            }
        }
    }
}

tasks.named<ProcessResources>("processResources") {
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
}

tasks.compileKotlin {
    dependsOn("generateProto")
}

tasks.register("customCopyTask") {
    dependsOn("generateProto")
    doFirst {
        println("Creating directory...")
        mkdir("../totuClient/src/generated")
    }
    doLast {
        copy {
            from(layout.buildDirectory.dir("generated/source/proto/main/ts"))
            into("../totuClient/src/generated")
            include("**/**")
        }
        println("Copied generated TypeScript files to ../totuClient/src/generated")
    }
}

tasks.build {
    dependsOn("compileKotlin")
    dependsOn("customCopyTask")
}