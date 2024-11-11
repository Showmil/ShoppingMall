const fs = require('fs'); // fs 모듈 불러오기. fs == 파일 싱크. 이를 통해 html 파일을 가져올 수 있다.
const main_view = fs.readFileSync('./main.html', 'utf-8'); // main_view에 main.html을 가져온다.
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log("main");

    mariadb.query("SELECT * FROM product;", function(err, rows) { // SELECT * FROM product 구문을 실행하고 에러가 생기면 err에 에러가 저장, 성공하면 rows에 객체값 저장
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type': 'text/html'}); // 응답의 헤더 정보를 설정
    response.write(main_view); // 클라이언트에게 보낼 응답의 본문
    response.end(); // 응답 종료
}

function login(response) {
    console.log('login');

    response.writeHead(200, {'Content-Type': 'text/html'}); // 응답의 헤더 정보를 설정
    response.write('Login Page'); // 클라이언트에게 보낼 응답의 본문
    response.end(); // 응답 종료
}

function favicon(response) {
    console.log("favicon");
}

function donggyun(response){
    console.log('donggyun');

    response.writeHead(200, {'Content-Type': 'text/html'}); // 응답의 헤더 정보를 설정
    response.write('Donggyun'); // 클라이언트에게 보낼 응답의 본문
    response.end(); // 응답 종료
}

function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    })
}

function order(response, productId){
    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("INSERT INTO orderlist VALUES (" + productId +", '" + new Date().toLocaleDateString() + "');", function(err, rows){
        console.log(rows);
    })
    response.write('order page');
    response.end();
}

function orderlist(response, productId){
    console.log('orderlist');

    response.writeHead(200, {'Content-Type': 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows){
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                + "<td>"+element.product_id+"</td>"
                + "<td>"+element.order_date+"</td>"
                +"</tr>");
        })
    })
}

let handle = {}; // key:value 쌍으로 이루어진 변수상자
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* 이미지 목록 */
handle['/favicon.ico'] = favicon;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;