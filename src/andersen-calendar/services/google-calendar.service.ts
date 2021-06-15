import { google } from "googleapis";
import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

const { OAuth2 } = google.auth;

@Injectable()
export class GoogleCalendarService {
  oAuth2Client: OAuth2Client;
  calendarAPI: any;
  constructor() {
    this.oAuth2Client = new OAuth2(
      "666531731569-99i9fkjajg658uqlmcs4difm0fcgav17.apps.googleusercontent.com",
      "S_rmv19iT1uSPZtv3IxTeczR"
    );
    this.oAuth2Client.setCredentials({
      refresh_token:
        "1//04LriUeeEY6e3CgYIARAAGAQSNwF-L9Ir5TsODtDgAHrDkp0Vuw3q-jmVa7tEnjlWuGlvanb9FgVJOXI_FR3sHvOUSFup5XZgMC4",
    });

    this.calendarAPI = google.calendar({
      version: "v3",
      auth: this.oAuth2Client,
    });
  }

  async test(): Promise<any> {
    const eventStartTime: Date = new Date();
    const eventEndTime: Date = new Date();
    eventStartTime.setDate(eventStartTime.getDay());
    eventEndTime.setDate(eventEndTime.getDay() + 1);
    eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

    const event = {
      summary: "Meet with David",
      location: null,
      description: "Meeting with David",
      start: {
        dateTime: eventStartTime,
        timezone: "Europe/Kiev",
      },
      end: {
        endTime: eventEndTime,
        timezone: "Europe/Kiev",
      },
      colorId: 1,
    };

    const res = await this.calendarAPI.calendarList.list();
    const resBusy = await this.calendarAPI.freebusy.query({
        resource: {
            timezone: "Europe/Kiev",
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            items: [{ id: 'l702f6kpjfq522tv8ei5da3tlo@group.calendar.google.com'}],
        }
    })

    console.log(res?.data?.items);
    console.log(resBusy?.data?.calendars['l702f6kpjfq522tv8ei5da3tlo@group.calendar.google.com']?.busy);
    return Promise.resolve(res?.data?.items);
  }
}
