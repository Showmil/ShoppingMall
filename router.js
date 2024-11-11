function route(pathname, handle, response, productID) {
    console.log('pathname : ' + pathname);

    if(typeof handle[pathname] == 'function') { // path가 function으로 이어지면
        handle[pathname](response, productID); // 함수를 실행
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'}); // 응답의 헤더 정보를 설정
        response.write('찾으시는 페이지가 없습니다.'); // 클라이언트에게 보낼 응답의 본문
        response.end(); // 응답 종료
    }
}

exports.route = route;