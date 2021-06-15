import { Command, Ctx, Hears, Start, Update, Sender } from "nestjs-telegraf";
import { UpdateType as TelegrafUpdateType } from "telegraf/typings/telegram-types";
import { Context } from "../interfaces/context.interface";
import { HELLO_SCENE_ID } from "../app.constants";
import { UpdateType } from "../common/decorators/update-type.decorator";
import { GoogleCalendarService } from "./services/google-calendar.service";

@Update()
export class AndersenCalendarUpdate {
  constructor(private calendarService: GoogleCalendarService) {}

  @Start()
  async onStart(): Promise<void> {
    const data = await this.calendarService.test();
    return data[0].summary
  }

  @Hears(["hi", "hello", "hey", "qq"])
  onGreetings(
    @UpdateType() updateType: TelegrafUpdateType,
    @Sender("first_name") firstName: string
  ): string {
    return `Hey ${firstName}`;
  }

  @Command("book")
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }
}
