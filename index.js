const exp = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
// const jwt = require('jsonwebtoken');
var cors = require('cors')
const app = exp();
const port = 3000;
const http = require('http');
const server = http.createServer(app);

// const PRIVATE_KEY = fs.readFileSync('private-key.txt');
app.use(bodyParser.json()); 
// app.use(cors());
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});
var mysql = require('mysql');
var db = mysql.createConnection({
     host: 'db-mysql-sgp1-91313-do-user-10243385-0.b.db.ondigitalocean.com',
     port:25060,
     user: 'khiem', 
     password: 'AVNS_vx-gxDXY-xoRhw5bb4s', 
     database: 'knlv',

}); 
db.connect((error) => console.log('Da ket noi database !',error));
module.exports = db; 
app.get("/", (req, res) => {
     res.send("Đây là trang chủ")
});

// io.on('connection', (socket) => {
//      socket.on('phone', (sdt) => {
//           io.emit('user',sdt)

//           console.log('phone: ' + sdt);
//      });
// });


app.get('/api/loai', (req, res) => {
     // const email = req.params.id;
     // const password = req.body.password;
     let sql = 'SELECT * FROM loai';
     db.query(sql, (err, rows) => { 
          res.status(200).json(rows)
          // console.log(err)

     })
})
app.get('/api/sanpham', (req, res) => {
     // const email = req.params.id;
     // const password = req.body.password;
     let sql = 'SELECT * FROM san_pham';
     db.query(sql, (err, rows) => { 
          res.json(rows)
          // console.log(err)

     })
})

app.post('/api/sanpham', (req, res) => {
     let tensp = req.body.tensp;
     let gia_nhap = req.body.giaNhap;
     let gia_ban = req.body.giaBan;
     let images = req.body.images;
     let mota = req.body.mota;
     let maLoai = req.body.maLoai;
     let date = req.body.date;

     let data ={
          ten_san_pham:tensp,
          gia_nhap:gia_nhap,
          gia_ban:gia_ban,
          images:images,
          mo_ta:mota,
          ma_loai:maLoai,
          ngay_them:date
     };  
     // const password = req.body.password;
     let sql = 'INSERT INTO san_pham SET ?';
     db.query(sql,data, function(err, d) { 
          res.json(d)
          console.log(err)
     }  ); 
})

app.post('/api/loai', (req, res) => {
     let tenloai = req.body.tenLoai;
     let user_info ={tenLoai:tenloai};  
     // const password = req.body.password;
     let sql = 'INSERT INTO loai SET ?';
     db.query(sql,user_info, function(err, d) { 
          res.json(d)
          console.log(err)
     }  ); 
})


app.listen(process.env.PORT || 3000)

// app.listen(port, () =>{
//      console.log(`Ung dung dang chay voi port ${port}`);
// });