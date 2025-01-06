"use strict";

const express = require("express");
const app = express();

//let bbs = [];  
let tasks = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 静的ファイルを提供


// BBS 関係のルート

// タスクを取得する
app.post('/tasks/get', (req, res) => {
  res.json({ tasks });  // クライアントにタスクのリストを返す
});

// タスクを追加する
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
        console.log(`タスク追加: ${task}`);  // ターミナルに追加したタスクを表示
        res.json({ success: true, task });
    } else {
        res.status(400).json({ success: false });
    }
});

// タスクを削除する
app.post('/tasks/delete', (req, res) => {  
  const { task } = req.body;
  const index = tasks.indexOf(task);
  if (index > -1) {
      tasks.splice(index, 1);
      console.log(`タスク削除: ${task}`);  // ターミナルに削除したタスクを表示
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false });
  }
});


app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  if (start == 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  bbs.push({ name: name, message: message, id: bbs.length, likes: 0 });
  res.json({ number: bbs.length });
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));

