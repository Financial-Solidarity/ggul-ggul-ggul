# Base image
FROM bellsoft/liberica-openjdk-alpine:17

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Run Gradle build
RUN chmod +x ./gradlew

RUN ./gradlew clean build -x test

RUN ls -al ./build/libs

RUN cp ./build/libs/application-0.0.1-SNAPSHOT.jar app.jar

cmd ["java", "-jar", "app.jar"]

