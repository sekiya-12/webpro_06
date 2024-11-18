const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if( num==3 ) luck = '小吉';
  else if( num==4 ) luck = '末吉';
  else if( num==5 ) luck = '凶';
  else if( num==6 ) luck = '大凶';
  
  res.render( 'luck', {luck:luck} );
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


app.get("/gacha", (req, res) => {
  res.render('gacha-form'); 
});


app.post("/gacha", (req, res) => {

  const gaNumber = Math.floor(Math.random() * 3 + 1);
  let ga = '';
  if (gaNumber == 1) ga = 'SSR';
  else if (gaNumber == 2) ga = 'SR';
  else if (gaNumber == 3) ga = 'R';


  const display = {
    ga: ga 
  };

  res.render('gacha-result', display); 
});

app.get("/quiz", (req, res) => {
  res.render('quiz'); 
});

app.post("/quiz-result", (req, res) => {
  const userInput = Number(req.body.answer); 
  let result = '';


  if (userInput === 1) {
    result = '正解';
  } else {
    result = '不正解';
  }

 
  res.render('quiz-result', { result: result });
});





app.listen(8080, () => console.log("Example app listening on port 8080!"));
