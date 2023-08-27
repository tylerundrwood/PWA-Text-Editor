import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  export const putDb = async (id, content) => {
    // create connection to database
    const jateDB = await openDB("jate", 1);
  
    // create new transaction and the privileges we want
    const transact = jateDB.transaction("jate", "readwrite");
  
    // open up object store we want
    const store = transact.objectStore("jate");
  
    // add() to add data to db
    const request = store.put({id: id, content: content} );
  
    // confirm the request worked
    const result = await request;
    return result;
  };
  
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    // create connection to database
    const jateDB = await openDB("jate", 1);
  
    // create new transaction and the privileges we want
    const transact = jateDB.transaction("jate", "readonly");
  
    // open up object store we want
    const store = transact.objectStore("jate");
  
    // getAll() built in method to get all data in db
    const request = store.getAll(1);
  
    // confirm the request worked
    const result = await request;
    return result?.value;
  };

initdb();
