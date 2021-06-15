import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { AndersenBotName } from "./app.constants";
import { AndersenCalendarModule } from "./andersen-calendar/andersen-calendar.module";
import { sessionMiddleware } from "./middleware/session.middleware";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: AndersenBotName,
      useFactory: () => ({
        token: "1780979536:AAG3VJi8xIC8sXFcW1OiHjs9MF8JyDy63kg",
        middlewares: [sessionMiddleware],
        include: [AndersenCalendarModule],
      }),
    }),
    AndersenCalendarModule,
  ],
})
export class AppModule {}
