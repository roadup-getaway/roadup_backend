const express = require('express')
const fs = require('fs')
const oracledb = require("oracledb");
const dbConfig = require("dbConfig.js");
const app = express()
const port = 7777

app.get('/', (req, res) => {  
  res.send('Hello World!')
  oracledb.getConnection({
    user            : dbConfig.user,
    password        : dbConfig.password,
    connectString   : dbConfig.connectString
  },
  function(err,connection){
    if (err) {
      console.error(err.message);
      return;
    }

    let query = 
      'select * ' +
      'fr om emp';
    connection.execute(query, [], function (err, result) {
      if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
      }
      console.log(result.rows);                   // 데이터
      doRelease(connection, result.rows);         // Connection 해제
  });
  // DB 연결 해제
  function doRelease(connection, rowList) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }

        // DB종료까지 모두 완료되었을 시 응답 데이터 반환
        console.log('list size: ' + rowList.length);
        
        response.send(rowList);
    });
}
  }
  );
})

app.get('/roads', (req, res) => {

  fs.readFile('roads.json', (err, data)=> {
    const roads = JSON.parse(data)

    console.log(
      roads
    )
    res.json(roads)
  }) 

  
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})