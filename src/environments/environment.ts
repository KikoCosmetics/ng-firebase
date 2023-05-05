import {FirebaseOptions} from "firebase/app";

export const environment = {
  production: false,
  firebaseConfigs: {
    free: {
      apiKey: "AIzaSyBwkpfDQdLYLH9J7jZNSSJPOHiCncGnjW8",
      authDomain: "kiko-login-tests.firebaseapp.com",
      projectId: "kiko-login-tests",
      storageBucket: "kiko-login-tests.appspot.com",
      messagingSenderId: "801479242798",
      appId: "1:801479242798:web:d445135028433c0c1e5bbf"
    } as FirebaseOptions,
    gcp: {
      apiKey: "AIzaSyD04x7bfjeTrui9Mf71Ko4ue7kSxY9Eswo",
      authDomain: "kiko-uc-ecommerce-dev.firebaseapp.com"
    } as FirebaseOptions
  }
};
