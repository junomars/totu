plugins {
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.serialization") version "1.9.22"
    id("com.google.protobuf") version "0.9.4"
    `maven-publish`
    id("pl.allegro.tech.build.axion-release")
}

group = "space.junodev"
version = scmVersion.version

repositories {
    mavenCentral()
}

val grpcVersion = "1.66.0"
val grpcKotlinStubVersion = "1.4.1"
val protobufVersion = "4.28.1"
val serializationVersion = "1.7.2"

dependencies {
    implementation(kotlin("stdlib"))
    implementation("io.grpc:grpc-kotlin-stub:$grpcKotlinStubVersion")
    implementation("io.grpc:grpc-protobuf:$grpcVersion")
    implementation("com.google.protobuf:protobuf-kotlin:$protobufVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:$serializationVersion")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:$serializationVersion")
}

scmVersion {
    tag {
        prefix = "totu-model"
    }
    repository {
        customUsername = System.getenv("GIT_USERNAME")
        customPassword = System.getenv("GIT_PASSWORD")
    }
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
    }
    generateProtoTasks {
        all().forEach { task ->
            task.plugins {
                create("grpc")
                create("grpckt")
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

tasks.build {
    dependsOn(tasks.compileKotlin)
}

publishing {
    publications {
        create<MavenPublication>("gpr") {
            from(components["java"])
            groupId = "space.junodev"
            artifactId = "totu-model"
            version = scmVersion.version
        }
    }
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/junomars/totu")
            credentials {
                username = project.findProperty("GIT_USERNAME") as String? ?: System.getenv("USERNAME")
                password = project.findProperty("GIT_PASSWORD") as String? ?: System.getenv("GITHUB_TOKEN")
            }
        }
    }
}