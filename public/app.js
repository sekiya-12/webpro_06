"use strict";

// DOM要素を取得
const todoForm = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const todoList = document.getElementById("todo-list");

// サーバーとのやり取りを行う関数
function postTask(task) {
    return fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            addTaskToList(data.task);
        } else {
            alert("タスクの追加に失敗しました");
        }
    })
    .catch(error => console.error('Error:', error));
}

// タスクをリストに追加する関数
function addTaskToList(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">削除</button>
    `;
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task));
    todoList.appendChild(li);
}

// タスクを削除する関数
function deleteTask(task) {
    fetch('/tasks/delete', {  // 削除用のPOSTリクエストを送信
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: task })  // 削除するタスクの内容を送信
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const items = [...todoList.querySelectorAll('li')];
            const targetItem = items.find(item => item.textContent.includes(task));
            if (targetItem) targetItem.remove();  // タスクが削除されればリストからも削除
        } else {
            alert("タスクの削除に失敗しました");
        }
    })
    .catch(error => console.error('Error:', error));
}

// フォーム送信イベント
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const task = taskInput.value.trim();
    if (task) {
        postTask(task);
        taskInput.value = '';  // 入力フィールドをリセット
    }
});

// 初期化処理（サーバーから既存のタスクを取得して表示）
function initializeApp() {
    fetch('/tasks/get', {  // POSTメソッドでタスクの取得
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})  // 空のリクエストボディを送信
    })
        .then(response => response.json())
        .then(data => {
            if (data.tasks) {
                data.tasks.forEach(task => {
                    addTaskToList(task);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}
// 初期化実行
initializeApp();
