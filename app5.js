const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ'; 
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち'; 
    win += 1; 
  } else {
    judgement = '負け'; 
  }

  total += 1; 
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

// ガチャフォーム表示
app.get("/gacha", (req, res) => {
  res.render('gacha-form'); // ガチャ引くフォームを表示
});

// ガチャを引く処理
app.post("/gacha", (req, res) => {
  // ガチャの結果をランダムに決定
  const gaNumber = Math.floor(Math.random() * 3 + 1);
  let ga = '';
  if (gaNumber == 1) ga = 'SSR';
  else if (gaNumber == 2) ga = 'SR';
  else if (gaNumber == 3) ga = 'R';

  // ガチャ結果を表示
  const display = {
    ga: ga // ランダムに出たガチャアイテム
  };

  res.render('gacha-result', display); // ガチャ結果ページに遷移
});

app.get("/quiz", (req, res) => {
  res.render('quiz'); // ユーザーに1〜3を入力させるフォームを表示
});

app.post("/quiz-result", (req, res) => {
  const userInput = Number(req.body.answer); // ユーザーの入力（1〜3）
  let result = '';

  // 1が正解、2または3は不正解
  if (userInput === 1) {
    result = '正解';
  } else {
    result = '不正解';
  }

  // 結果を表示
  res.render('quiz-result', { result: result });
});





app.listen(8080, () => console.log("Example app listening on port 8080!"));
