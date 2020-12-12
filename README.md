# 마인드패스 고형규 포트폴리오 (Node.js 관련)

1. bracelet_Project
IoT 기반의 팔찌 외주 용역 개발 건

Arduino <-> Node.js <-> Android<br>
에서 Node.js를 활용한 개발 프로젝트<br>
1.1 Arduino의 데이터 값을 서버로 전송(json)<br>
1.2 서버(Node.js)에서 Android 애플리케이션으로 전송<br>

======================================================================

2. cloth_admin
CNN 기반의 의류 분류 및 코디 애플리케이션의 관리자 페이지(웹페이지)

HTML(EJS) <-> Node.js
에서 Node.js를 활용한 개발 프로젝트
Database Create, Update, Insert, Delete 관련 웹페이지

======================================================================

3. cloth_cl
CNN 기반의 의류 분류 및 코디 애플리케이션

Android <-> Node.js(Python) <-> Android
Android에서 들어온 사진 값을 서버에 입력
Node.js가 이미지 분석(Python기반 GoogleNet) 실행 후 분석
분석 결과를 Android에 전송
Database Create, Update, Insert, Delete 포함

======================================================================

4. konlpy_test
위치 기반의 메모 알람 애플리케이션

Android <-> Node.js(Python) <-> Android
Android GPS값을 Node.js로 받아옴
서버 Database 값에 저장되어 있는 GPS값에 따라 푸시알람 전송(Firebase)
Android 메모 데이터를 받아와 Node.js를 통해 Python Konlpy 함수 실행
결과를 Android로 전송




