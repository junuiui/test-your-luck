import express from 'express';
import cors from 'cors';
import { assignRandom, generateCode } from './logic';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const gameData: Record<string, string[]> = {}; // 메모리 저장

// 게임 생성
app.post('/create', (req, res) => {
  const { names } = req.body;

  if (!Array.isArray(names) || names.length === 0) {
    return res.status(400).json({ error: '이름 배열이 필요해요.' });
  }

  const shuffled = assignRandom(names);
  const code = generateCode();
  gameData[code] = shuffled;

  res.json({ code, results: shuffled });
});

// 결과 조회
app.get('/join/:code', (req, res) => {
  const { code } = req.params;
  const result = gameData[code];

  if (!result) {
    return res.status(404).json({ error: '코드에 해당하는 게임이 없어요.' });
  }

  res.json({ names: result });
});

// 서버 시작
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
