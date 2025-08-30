const DB_NAME = 'diary-app';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

const LOCAL_STORAGE_KEY = 'diary-entries';

// IndexedDBの初期化
export async function initDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
    });
}

// データの保存
export async function saveEntry(entry: Entry): Promise<void> {
    try {
        const db = await initDatabase();
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.add(entry);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error)
        });
    } catch (error){
        const entries = loadFromLocalStorage();
        entries.push(entry);
        saveToLocalStorage(entries);
    }
}

// データの取得
export async function getEntries(): Promise<Entry[]> {
    try {
        const db = await initDatabase();
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('createdAt');

        return new Promise((resolve, reject) => {
            const request = index.getAll();
            request.onsuccess = () => {
                const entries = request.result as Entry[];
                resolve(entries.sort((a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                ));
            };
            request.onerror = () => reject(request.error);
        })
    } catch (error) {
        return loadFromLocalStorage();
    }
}

// データの削除
export async function deleteEntry(id: string): Promise<void> {
    try {
        const db = await initDatabase();
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        return new Promise((resolve, reject) => {
            const request = store.delete(id);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        const entries = loadFromLocalStorage();
        const filteredEntries = entries.filter(entry => entry.id !== id);
        saveToLocalStorage(filteredEntries);
    }
}
  
// localStorageフォールバック
export function saveToLocalStorage(entries: Entry[]): void {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.error('localStorage保存に失敗:', error)
    }
}
  
export function loadFromLocalStorage(): Entry[] {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('localStorage読み込みに失敗:', error);
        return [];
    }
}