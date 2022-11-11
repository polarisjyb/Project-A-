import express from 'express';
import path from 'path';
import maria from 'mysql';

// 설치모듈 express path mysql 

const app = express();

const conn = maria.createConnection({
  host: 'localhost',
  port: 3000,
  user: 'root',
  password: 'pass',
  database: 'aitrading_db'
});

app.set('port', process.env.PORT || 3333);

const __dirname = path.resolve();

app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/maria', (req, res) => {
  const sql ='select * from chantime limit 10' 
  conn.query(sql, (err, result, field) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    console.log(result);
    res.send(result);
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
//test
