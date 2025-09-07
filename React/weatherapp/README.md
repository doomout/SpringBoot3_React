# React Weather App

React와 OpenWeatherMap API를 사용하여 만든 간단한 날씨 조회 애플리케이션입니다.  
현재는 `Seoul`의 날씨를 불러와서 **온도, 날씨 상태, 아이콘**을 보여줍니다.

## 🚀 실행 방법

### 1. 프로젝트 생성

```bash
npm create vite@latest
프로젝트명 -> react -> javaScript 선택
cd 프로젝트명
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 .env 파일을 만들고 다음 내용을 추가합니다.
API 키는 OpenWeatherMap 에서 무료 발급 가능합니다.

```ini
VITE_WEATHER_API_KEY=발급받은_API_KEY
```

### 3. 실행

```bash
npm run dev
```
