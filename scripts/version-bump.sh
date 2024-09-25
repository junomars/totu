#!/bin/bash

# Fetch the latest commit message
commitMessage=$(git log -1 --pretty=%B)

# Define the default version increment
increment="patch"

# Determine the type of version bump
if [[ $commitMessage == feat* ]]; then
    increment="minor"
elif [[ $commitMessage == fix* ]]; then
    increment="patch"
elif [[ $commitMessage == breaking* ]]; then
    increment="major"
fi

# Run the corresponding Gradle release command
if [ "$increment" == "minor" ]; then
    ./gradlew release -Prelease.incrementer=incrementMinor
elif [ "$increment" == "patch" ]; then
    ./gradlew release -Prelease.incrementer=incrementPatch
elif [ "$increment" == "major" ]; then
    ./gradlew release -Prelease.incrementer=incrementMajor
else
    ./gradlew release
fi
