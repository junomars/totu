rootProject.name = "totu"

include("totuServer")

includeBuild("totuModel") {
    dependencySubstitution {
        substitute(module("space.junodev:totuModel")).using(project(":"))
    }
}