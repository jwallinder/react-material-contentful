import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: process.env.REACT_APP_FIREBSE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDERID
};

class Firebase {
    constructor() {

        app.initializeApp(config);

        this.auth = app.auth();
        this.database = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doAddNewUserData = (name, email, message) => {
        this.database.ref('users').push().set({
            username: name,
            email,
            message,
            created: new Date().toISOString()
        });
    }
}

export default Firebase;