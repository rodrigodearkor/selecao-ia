FROM openjdk:8-jdk-alpine as build

WORKDIR /api

COPY build/libs/selecao-ia-server-0.0.1-SNAPSHOT.jar api-server.jar

CMD [ "java", "-jar", "api-server.jar" ]
