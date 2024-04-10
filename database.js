import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("board.db");

const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS posts (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "title TEXT NOT NULL, " +
        "content TEXT NOT NULL, " +
        "author TEXT, " +
        "category TEXT, " +
        "imageUri TEXT, " +
        "created_at DATETIME DEFAULT CURRENT_TIMESTAMP" +
        ");",
      [],
      () => console.log("Database and table created successfully"),
      (_, error) =>
        console.error("Error occurred while creating the table", error)
    );
  });
};

export const insertPost = (
  title,
  content,
  author,
  category,
  imageUri,
  callback
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO posts (title, content, author, category, imageUri) VALUES (?, ?, ?, ?, ?)",
      [title, content, author, category, imageUri],
      (_, result) => callback(true, result),
      (_, err) => {
        console.error("Error inserting post", err);
        callback(false);
      }
    );
  });
};

export const fetchPosts = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM posts ORDER BY created_at DESC",
      [],
      (_, { rows }) => callback(rows._array),
      (_, err) => {
        console.error("Error fetching posts", err);
        callback([]);
      }
    );
  });
};

export const fetchPostById = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM posts WHERE id = ?",
      [id],
      (_, { rows }) => {
        callback(rows._array[0]);
      },
      (_, err) => {
        console.error("Error fetching post by ID", err);
        callback(null);
      }
    );
  });
};

export const deletePost = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM posts WHERE id = ?",
      [id],
      (_, result) => {
        if (result.rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (_, err) => {
        console.error("Error deleting post", err);
        callback(false);
      }
    );
  });
};

export const updatePost = (id, title, content, imageUri, callback) => {
  const db = SQLite.openDatabase("board.db");
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE posts SET title = ?, content = ?, imageUri = ? WHERE id = ?",
      [title, content, imageUri, id],
      (_, result) => {
        if (result.rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (transaction, error) => {
        console.error("Failed to update post", error);
        callback(false);
      }
    );
  });
};

export default initDB;
