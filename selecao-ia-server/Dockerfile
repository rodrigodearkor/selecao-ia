FROM openjdk:8-jdk-alpine as build

WORKDIR /api

COPY gradle gradle
COPY gradlew gradlew
COPY build.gradle .
COPY build build
COPY src src

#ENV PATH /app/gradlew:$PATH

# RUN npm install --silent && npm cache clean --force --loglevel=error

# COPY . .

CMD [ "java", "-jar", "build/libs/selecao-ia-server-0.0.1-SNAPSHOT.jar" ]