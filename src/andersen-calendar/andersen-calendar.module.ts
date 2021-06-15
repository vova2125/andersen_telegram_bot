import { Module } from "@nestjs/common";
import { RandomNumberScene } from "./scenes/random-number.scene";
import { AndersenCalendarUpdate } from "./andersen-calendar.update";
import { GoogleCalendarService } from "./services/google-calendar.service";

@Module({
  providers: [RandomNumberScene, AndersenCalendarUpdate, GoogleCalendarService],
})
export class AndersenCalendarModule {}
