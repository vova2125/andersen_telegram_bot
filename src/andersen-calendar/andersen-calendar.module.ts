import { Module } from "@nestjs/common";
import { RandomNumberScene } from "./scenes/random-number.scene";
import { AndersenCalendarUpdate } from "./andersen-calendar.update";

@Module({
  providers: [RandomNumberScene, AndersenCalendarUpdate],
})
export class AndersenCalendarModule {}
