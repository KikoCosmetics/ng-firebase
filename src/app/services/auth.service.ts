import {Injectable} from "@angular/core";
import {AppCheckOptions} from "@firebase/app-check";
import {
    AuthProvider,
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    beforeAuthStateChanged,
    signOut,
    Auth,
    User
} from "firebase/auth";
import {
    AppCheck,
    initializeAppCheck,
    ReCaptchaV3Provider
} from "firebase/app-check";
import {FirebaseApp, FirebaseOptions, initializeApp} from "firebase/app";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    get config(): FirebaseOptions {
        return environment.firebaseConfigs.free;
    }

    get loggedUser(): User | void {
        return this.#loggedUser;
    }

    readonly #app: FirebaseApp = initializeApp(this.config);
    readonly #appCheck: AppCheck;
    readonly #auth: Auth;
    readonly #googleProvider: GoogleAuthProvider = new GoogleAuthProvider();
    #loggedUser: User;
    readonly #restrictedError: string = "auth/admin-restricted-operation";

    constructor() {
        this.#auth = getAuth(this.#app);
        this.#appCheck = initializeAppCheck(this.#app, {
            provider: new ReCaptchaV3Provider(environment.recaptchaConfigs.free.key),
            isTokenAutoRefreshEnabled: true
        } as AppCheckOptions);
        this.#watchAuthState;
    }

    async signInWithGoogle(): Promise<User> {
        return this.#signInWithProvider(this.#googleProvider)
            .catch(err => {
                console.info("SOCIAL SIGNIN ERROR", err);
                // The user is not yet registered
                if (err.code === this.#restrictedError) {
                    const credential = GoogleAuthProvider.credentialFromError(err);
                    console.info("SOCIAL SIGNIN CREDENTIAL USED", {
                        credential,
                        customData: err.customData
                    });
                }

                throw new Error("socialSignInError");
            });
    }

    signUpUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.#auth, email, password);
    }

    signInUser(email: string, password: string) {
        return signInWithEmailAndPassword(this.#auth, email, password);
    }

    signOut(): Promise<void> {
        return signOut(this.#auth);
    }

    // private

    async #signInWithProvider<T extends AuthProvider = AuthProvider>(provider: T): Promise<User> {
        return signInWithPopup(this.#auth, provider)
            .then((userCredential) => userCredential.user);
    }

    #watchAuthState(): void {
        onAuthStateChanged(this.#auth, (user: User | null) => {
            this.#loggedUser = user || void 0;
        });
    }
}
