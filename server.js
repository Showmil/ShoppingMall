let http = require('http'); // http 모듈을 불러온다. http 서버를 만드는 기능을 제공한다.
let url = require('url'); // url 모듈을 불러온다. url 경로를 분석하는 데 사용한다.

function start(route, handle) {
    function onRequest(request, response) { // 요청(request)과 응답(response)를 매개변수로 삼는다
        let pathname = url.parse(request.url).pathname; // url.parse()를 통해 HTTP가 요청한 URL의 정보를 경로, 쿼리, 프로토콜 등으로 분리한 뒤 pathname을 추출
        let queryData = url.parse(request.url, true).query;
        route(pathname, handle, response, queryData.productId); // route 함수에 pathname 전달
    }
    
    http.createServer(onRequest).listen(8888);
}

exports.start = start; // start 함수를 외부에서도 사용할 수 있게 설정