const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 프론트엔드 정적 파일(index.html 등) 연결 설정
app.use(express.static(path.join(__dirname, 'public')));

// 16강 토너먼트용 음식 데이터
const foods = [
  { id: 1, name: "김치찌개", category: "한식", img: "https://static.wtable.co.kr/image/production/service/recipe/291/a2421dff-e56c-40bd-8b40-06a91fc000a9.jpg" },
  { id: 2, name: "삼겹살", category: "한식", img: "https://cdn.mhns.co.kr/news/photo/202401/570991_700215_2940.jpg" },
  { id: 3, name: "짜장면", category: "중식", img: "https://image.greating.co.kr/IL/item/202503/25/8ACD551BCD0340238443B927DB0DB2A9.jpg" },
  { id: 4, name: "마라탕", category: "중식", img: "https://img.bizthenaum.co.kr/data/img/1000013666/ori/1000013666_1.jpg" },
  { id: 5, name: "초밥", category: "일식", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop" },
  { id: 6, name: "돈까스", category: "일식", img: "https://metizen.co.kr/wp-content/uploads/2023/10/01-copy.jpg" },
  { id: 7, name: "파스타", category: "양식", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop" },
  { id: 8, name: "피자", category: "양식", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop" },
  { id: 9, name: "떡볶이", category: "분식", img: "https://cookpick.kr/wp-content/uploads/2025/11/gukmul-tteokbokki-recipe2.webp" },
  { id: 10, name: "햄버거", category: "패스트푸드", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop" },
  { id: 11, name: "치킨", category: "야식", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop" },
  { id: 12, name: "라멘", category: "일식", img: "https://noodleplanet.co.kr/wp-content/uploads/2024/10/webzine-10-story-2-1.jpg" },
  { id: 13, name: "제육볶음", category: "한식", img: "https://t1.daumcdn.net/brunch/service/user/e00Q/image/fz7htIjz0DWRDGTT8DGzlbl9uAE.jpg" },
  { id: 14, name: "쌀국수", category: "아시안", img: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&auto=format&fit=crop" },
  { id: 15, name: "족발", category: "야식", img: "https://flexgcdn-moraguo12.moall.shop/data/goods/moraguo12/small/thum2/1000x1000_02_20260108100041917_1.jpg" },
  { id: 16, name: "스테이크", category: "양식", img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&auto=format&fit=crop" }
];

let favorites = [];
let winStats = {};

// API 라우트
app.get('/api/foods', (req, res) => {
  res.json({ success: true, data: foods });
});

app.get('/api/favorites', (req, res) => {
  res.json({ success: true, data: favorites });
});

app.post('/api/favorites', (req, res) => {
  const { foodName } = req.body;
  if (foodName && !favorites.includes(foodName)) {
    favorites.push(foodName);
  }
  res.json({ success: true, data: favorites });
});

app.post('/api/worldcup/winner', (req, res) => {
  const { winnerName } = req.body;
  winStats[winnerName] = (winStats[winnerName] || 0) + 1;
  res.json({ success: true, message: `[${winnerName}] 우승 기록 완료`, stats: winStats });
});

// 메인 라우트 (index.html 전달)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 포트 설정 (Render 배포 및 로컬 호환)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중 (포트: ${PORT})`);
});