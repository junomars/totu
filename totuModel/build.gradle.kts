import java.util.*

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

val grpcVersion = "1.47.0"
val protobufVersion = "3.21.7"
val serializationVersion = "1.5.1"

dependencies {
    implementation(kotlin("stdlib"))
    implementation("io.grpc:grpc-kotlin-stub:1.3.0")
    implementation("io.grpc:grpc-protobuf:$grpcVersion")
    implementation("com.google.protobuf:protobuf-kotlin:$protobufVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:$serializationVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:$serializationVersion")
}

protobuf {
    protoc {
        artifact = "com.google.protobuf:protoc:$protobufVersion"
    }
    plugins {
        create("grpc") {
            artifact = "io.grpc:protoc-gen-grpc-java:$grpcVersion"
        }
        create("grpckt") {
            artifact = "io.grpc:protoc-gen-grpc-kotlin:1.3.0:jdk8@jar"
        }
        create("ts") {
            path = if (System.getProperty("os.name").lowercase(Locale.getDefault()).contains("win")) {
                "${projectDir}/node_modules/.bin/protoc-gen-ts_proto.cmd"
            } else {
                "${projectDir}/node_modules/.bin/protoc-gen-ts_proto"
            }
        }
    }
    generateProtoTasks {
        all().forEach { task ->
            task.plugins {
                create("grpc")
                create("grpckt")
                create("ts")
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
    outputs.dir("../totuClient/src/generated")
    doLast {
        println("Creating directory...")
        copy {
            from(layout.buildDirectory.dir("generated/source/proto/main/ts"))
            into("../totuClient/src/generated")
            include("**/**")
        }
        println("Copied generated TypeScript files to ../totuClient/src/generated")
    }
}

tasks.build {
    dependsOn(tasks.compileKotlin, tasks.named("customCopyTask"))
}

kotlin {
    jvmToolchain(17)
}
tasks.withType<JavaCompile> {
    sourceCompatibility = "17"
    targetCompatibility = "17"
}