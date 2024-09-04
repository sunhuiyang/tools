/**
 * 创建打开数据库
 * @param {object} dbName 数据库的名字
 * @param {string} storeName 仓库名称
 * @param {string} version 数据库的版本
 * @return {object} 该函数会返回一个数据库实例
 */
export const openDB = function (dbName, version = 1) {
  return new Promise((resolve, reject) => {
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;

    let db;

    const request = indexedDB.open(dbName, version);
    request.onsuccess = (e) => {
      db = e.target.result;
      console.log("数据库打开成功", db);
      resolve(db);
    };
    request.onerror = () => {
      console.log("数据库打开失败");
    };

    request.onupgradeneeded = (e) => {
      console.log("数据库升级");
      db = e.target.result; //数据库对象
      let objectStore;
      objectStore = db.createObjectStore("signalChat", {
        keyPath: "sequenceId", // 这是主键
        // autoIncrement: true // 实现自增
      });
      // 创建索引，在后面查询数据的时候可以根据索引查
      objectStore.createIndex("link", "link", { unique: false });
      objectStore.createIndex("sequenceId", "sequenceId", { unique: false });
      objectStore.createIndex("messageType", "messageType", {
        unique: false,
      });
    };
  });
};

/**
 * 新增数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} data 数据
 */
export function addData(db, storeName, data) {
  var request = db
    .transaction([storeName], "readwrite") // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
    .objectStore(storeName) // 仓库对象
    .add(data);

  request.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  request.onerror = function (event) {
    console.log("数据写入失败");
  };
}

/**
 * 通过主键读取数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 */
export function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    var transaction = db.transaction([storeName]); // 事务
    var objectStore = transaction.objectStore(storeName); // 仓库对象
    var request = objectStore.get(key); // 通过主键获取数据

    request.onerror = function (event) {
      console.log("事务失败");
    };

    request.onsuccess = function (event) {
      console.log("主键查询结果: ", request.result);
      resolve(request.result);
    };
  });
}
/*
 *通过索引查询数据
 */
export function getDataByIndex(db, storeName, indexName, indexValue) {
  var store = db.transaction(storeName, "readwrite").objectStore(storeName);
  var request = store.index(indexName).get(indexValue);
  request.onerror = function () {
    console.log("事务失败");
  };
  request.onsuccess = function (e) {
    var result = e.target.result;
    console.log("索引查询结果：", result);
  };
}
/**
 * 通过游标查询数据
 */

export function cursorGetData(db, storeName) {
  let list = [];
  var store = db.transaction(storeName, "readwrite").objectStore(storeName);
  var request = store.openCursor();
  request.onsuccess = (e) => {
    let cursor = e.target.result;
    if (cursor) {
      list.push(cursor.value);
      cursor.continue();
    } else {
      console.log("游标读取的数据", list);
    }
  };
}

/**
 * 更新数据
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {object} data 数据
 */
export function updateDB(db, storeName, data) {
  var request = db
    .transaction([storeName], "readwrite") // 事务对象
    .objectStore(storeName) // 仓库对象
    .put(data);

  request.onsuccess = function () {
    console.log("数据更新成功");
  };

  request.onerror = function () {
    console.log("数据更新失败");
  };
}

/**
 * 通过主键删除数据
 */
export function deleteDB(db, storeName, id) {
  var request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName)
    .delete(id);

  request.onsuccess = () => {
    console.log("删除成功");
  };
  request.onerror = function () {
    console.log("数据删除失败");
  };
}
