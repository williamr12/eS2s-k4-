// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Firebase Config
  firebaseConfig : {
    apiKey: 'AIzaSyCm2qffKvd71DVOdZsbo6yBxyXrmrrF6YY',
    authDomain: 'providers-fyi-42d78.firebaseapp.com',
    databaseURL: 'https://providers-fyi-42d78-default-rtdb.firebaseio.com',
    projectId: 'providers-fyi-42d78',
    storageBucket: 'providers-fyi-42d78.appspot.com',
    messagingSenderId: '194735303082',
    appId: '1:194735303082:web:658b1edf3133109ca1e3d3',
    measurementId: 'G-5VF94TEFL0'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
