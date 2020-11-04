

export default class DAO {

    /* db tracking */

    static addActivity(activity: string) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['activities'], 'readwrite');
            let objectStore = transaction.objectStore('activities');

            let request = objectStore.add({
                name: activity
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addUser(name: string) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['users'], 'readwrite');
            let objectStore = transaction.objectStore('users');

            let request = objectStore.add({
                name: name
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }


    static getUsers() {
        return new Promise((resolve, reject) => {

            let users: Array<any> = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('users').objectStore('users');

            let cursor = objectStore.openCursor();
            cursor.onsuccess = function(event: any) {
                var cursor = event.target.result;
                if (cursor) {
                    users.push(cursor.value);
                    cursor.continue();
                } else {
                    console.log('yes');
                    resolve(users);
                }
            };
            cursor.onerror = reject;
        });
    }


    /*
    static addStockImage(image) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['images'], 'readwrite');
            let objectStore = transaction.objectStore('images');

            let request = objectStore.add({
                id: image.id,
                thumbnail_240_url: image.thumbnail_240_url,
                thumbnail_500_url: image.thumbnail_500_url,
                thumbnail_url: image.thumbnail_url,
                title: image.title
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addStockPreviewed(id) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['previewed'], 'readwrite');
            let store = transaction.objectStore('previewed');

            let request = store.add({
                image_id: id,
                date: Date.now()
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addStockDownload(id) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['downloaded'], 'readwrite');
            let store = transaction.objectStore('downloaded');

            let request = store.add({
                image_id: id,
                date: Date.now()
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addStockLicense(id) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['licensed'], 'readwrite');
            let store = transaction.objectStore('licensed');

            let request = store.add({
                image_id: id,
                date: Date.now()
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addStockLibrary(name) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['libraries'], 'readwrite');
            let store = transaction.objectStore('libraries');

            let request = store.add({
                name
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static addStockLibraryImage(libraryId, imageId) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['libraryImages'], 'readwrite');
            let store = transaction.objectStore('libraryImages');

            let request = store.add({
                image_id: imageId,
                library_id: libraryId,
                date: Date.now()
            });
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static deleteStockLibraryImage(data) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['libraryImages'], 'readwrite');
            let store = transaction.objectStore('libraryImages');

            let request = store.delete(data.id);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static updateStockLibraryImage(originalData, libraryId, imageId) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['libraryImages'], 'readwrite');
            let store = transaction.objectStore('libraryImages');

            let data = originalData;
            data.image_id = imageId;
            data.library_id = libraryId;
            data.date = Date.now();

            let request = store.put(data);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static updateStockPreviewed(originalData) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['previewed'], 'readwrite');
            let store = transaction.objectStore('previewed');

            let data = originalData;
            data.date = Date.now();

            let request = store.put(data);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static updateStockDownload(originalData) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['downloaded'], 'readwrite');
            let store = transaction.objectStore('downloaded');

            let data = originalData;
            data.date = Date.now();

            let request = store.put(data);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static updateStockLicense(originalData) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let transaction = _db.transaction(['licensed'], 'readwrite');
            let store = transaction.objectStore('licensed');

            let data = originalData;
            data.date = Date.now();

            let request = store.put(data);
            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    static getStockImageLibrariesByImageId(imageId) {
        return new Promise((resolve, reject) => {
            let libraries = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('libraryImages').objectStore('libraryImages');
            let index = objectStore.index('image_id');

            let cursor = index.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    if (cursor.value.image_id === imageId) {
                        libraries.push(cursor.value);
                    }
                    cursor.continue();
                } else {
                    resolve(libraries);
                }
            };
            cursor.onerror = reject;
        });
    }

    static getStockPreviewedByImageId(imageId) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('previewed').objectStore('previewed');
            let index = objectStore.index('image_id');

            let request = index.get(imageId);
            request.onsuccess = function(e) {
                resolve(e.target.result);
            };
            request.onerror = reject;
        });
    }

    static getStockDownloadByImageId(imageId) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('downloaded').objectStore('downloaded');
            let index = objectStore.index('image_id');

            let request = index.get(imageId);
            request.onsuccess = function(e) {
                resolve(e.target.result);
            };
            request.onerror = reject;
        });
    }

    static getStockLicenseByImageId(imageId) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('licensed').objectStore('licensed');
            let index = objectStore.index('image_id');

            let request = index.get(imageId);
            request.onsuccess = function(e) {
                resolve(e.target.result);
            };
            request.onerror = reject;
        });
    }

    static getStockImageById(id) {
        return new Promise((resolve, reject) => {
            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('images').objectStore('images');

            let request = objectStore.get(id);
            request.onsuccess = function(e) {
                resolve(e.target.result);
            };
            request.onerror = reject;
        });
    }

    static getStockImages() {
        return new Promise((resolve, reject) => {

            let images = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('images').objectStore('images');

            let cursor = objectStore.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    images.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(images);
                }
            };
            cursor.onerror = reject;
        });
    }

    static getStockLibraries() {
        return new Promise((resolve, reject) => {

            let libraries = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('libraries').objectStore('libraries');

            let cursor = objectStore.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    libraries.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(libraries);
                }
            };
            cursor.onerror = reject;
        });
    }

    static getLibraryImages() {
        return new Promise((resolve, reject) => {

            let librariesImages = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('libraryImages').objectStore('libraryImages');

            let cursor = objectStore.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    librariesImages.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(librariesImages);
                }
            };
            cursor.onerror = reject;
        });
    }

    static getStockLicensed() {
        return new Promise((resolve, reject) => {

            let licensed = [];

            let _db = window._db.getDatabase();
            let objectStore = _db.transaction('licensed').objectStore('licensed');

            let cursor = objectStore.openCursor();
            cursor.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    licensed.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(licensed);
                }
            };
            cursor.onerror = reject;
        });
    }
    */
}
