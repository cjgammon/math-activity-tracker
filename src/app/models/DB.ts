
import DAO from './DAO';


let storeName = 'math_activities';
let version = 1;

export default class Database{

    request: any;
    db: any;
    initiating: boolean;
    oncomplete?: any;

    constructor() {

        if (!window.indexedDB) {
            window.alert('Your browser doesn\'t support a stable version of IndexedDB. Such and such feature will not be available.');
        }

        // attempt to open the database
        this.request = indexedDB.open(storeName, version);
        // upgrade/create the database if needed
        this.request.onupgradeneeded = (e: any) => this.upgradeneeded(e);
        this.request.onsuccess = (e: any) => this.success(e);

    }

    getDatabase() {
        return this.db;
    }

    upgradeneeded(e: any) {
        console.log('upgradeneeded');

        let db,
            userStore,
            dataStore;

        db = e.target.result;
        this.db = db;

        // Version 1 is the first version of the database.
        if (e.oldVersion < 1) {

            this.initiating = true;

            userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true});
            userStore.createIndex('name', 'name', { unique: true });

            dataStore = db.createObjectStore('activity_data', { keyPath: 'id', autoIncrement: true});
            dataStore.createIndex('user_id', 'user_id', { unique: false });
            dataStore.createIndex('activity_id', 'activity_id', { unique: false });
            dataStore.createIndex('problem', 'problem', { unique: false });
            dataStore.createIndex('correct_answer', 'correct_answer', { unique: false });
            dataStore.createIndex('given_answer', 'given_answer', { unique: false });
            dataStore.createIndex('correct', 'correct', { unique: false });
            dataStore.createIndex('milliseconds', 'milliseconds', { unique: false });

        }

        if (e.oldVersion < 2) {
            // In future versions we'd upgrade our database here.
            // This will never run here, because we're version 1.
        }
    }

    success(e: any) {
        // assign the database for access outside
        this.db = e.target.result;
        this.db.onerror = this.error;

        if (this.initiating === true) {
            DAO.addUser('Nola');
            DAO.addUser('Jonas');
        }

        console.log('success', this.db);
        this.complete();

    }

    complete() {
        if (this.oncomplete){
            this.oncomplete();
        }
    }

    error() {
        console.log('error', arguments);
    }

}
