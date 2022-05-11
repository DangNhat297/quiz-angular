// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseAPIURL = 'http://localhost:3000';
export const environment = {
  production: false,
  baseAPIURL: `${baseAPIURL}`,
  user_api: `${baseAPIURL}/users`,
  subject_api: `${baseAPIURL}/subjects`,
  imgur_api: `https://api.imgur.com/3/image`,
  GOOGLE_CLIENT_ID: "1020635148548-unuvm7epe1116fegge4jgu3gs9q5faep.apps.googleusercontent.com" // http://asmangular.com:4200/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
