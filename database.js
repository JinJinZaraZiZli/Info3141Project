import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('board.db');

const initDB = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, author TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);',
        [],
        () => console.log('Database and table created successfully'),
        (_, error) => console.error('Error occurred while creating the table', error)
      );
    });
  }; 

export const insertPost = (title, content, author, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
      [title, content, author],
      (_, result) => callback(true, result),
      (_, err) => {
        console.error('Error inserting post', err);
        callback(false);
      }
    );
  });
};

export const fetchPosts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM posts ORDER BY created_at DESC',
      [],
      (_, { rows }) => callback(rows._array),
      (_, err) => {
        console.error('Error fetching posts', err);
        callback([]);
      }
    );
  });
};

export const fetchPostById = (id, callback) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM posts WHERE id = ?',
        [id],
        (_, { rows }) => {
          callback(rows._array[0]); // 결과의 첫 번째 항목 반환
        },
        (_, err) => {
          console.error('Error fetching post by ID', err);
          callback(null);
        }
      );
    });
  }; 

export default initDB;
