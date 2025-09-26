FROM eclipse-temurin:17-jdk
VOLUME /tmp
EXPOSE 8081
COPY build/libs/SpringBoot3_React-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
