# Stage 1: Build the application using Gradle
FROM gradle:jdk17 AS temp_build_image

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME

# Copy Gradle build files and wrapper
COPY build.gradle.kts settings.gradle.kts gradlew* $APP_HOME/
COPY gradle/wrapper/ $APP_HOME/gradle/wrapper/

# Copy all subprojects directly if they are in the root of your project
COPY totuModel/ $APP_HOME/totuModel/
COPY totuServer/ $APP_HOME/totuServer/

# Ensure the Gradle wrapper is executable
RUN chmod +x gradlew

# Build dependencies
RUN cd totuModel && npm install
RUN cd ..

# Build the project using the wrapper
RUN ./gradlew clean build --no-daemon

# Stage 2: Create the final runtime image
FROM openjdk:17-jdk-slim

ENV ARTIFACT_NAME=totuServer/build/libs/totuServer-all.jar
ENV APP_HOME=/usr/app/

WORKDIR $APP_HOME

# Copy the built JAR from the build stage
COPY --from=temp_build_image /usr/app/$ARTIFACT_NAME ./

# Expose the application port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "totuServer-all.jar", "-port", "8080"]
