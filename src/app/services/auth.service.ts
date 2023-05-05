import {Injectable} from "@angular/core";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    Auth,
    UserCredential
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
    Firestore
} from "firebase/firestore";
import {FirebaseApp, FirebaseOptions, initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

    get config(): FirebaseOptions {
        return environment.firebaseConfigs.gcp;
    }

    get loginStatus() {
        return JSON.parse(
            localStorage.getItem("loggedIn") || this._loggedInStatus.toString()
        );
    }

    private _app: FirebaseApp = initializeApp(this.config);
    private _auth: Auth;

    private _loggedInStatus = JSON.parse(
        localStorage.getItem("loggedIn") || "false"
    );

    constructor() {
        this._auth = getAuth(this._app);
    }

    setLoginStatus(value: boolean) {
        this._loggedInStatus = value;
        localStorage.setItem("loggedIn", "true");
    }

    signUpUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this._auth, email, password);
    }

    signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(this._auth, email, password);
    }

}
