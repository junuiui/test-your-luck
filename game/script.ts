const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const nameInput = document.getElementById("nameInput") as HTMLTextAreaElement;
const resultBox = document.getElementById("resultBox") as HTMLDivElement;

submitBtn.addEventListener("click", async () => {
  const rawText = nameInput.value.trim();
  if (!rawText) {
    resultBox.innerText = "이름을 입력하세요!";
    return;
  }

  // 줄바꿈으로 이름 나누기
  const names = rawText.split("\n").map(name => name.trim()).filter(Boolean);

  try {
    const response = await fetch("http://localhost:3000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ names })
    });

    if (!response.ok) {
      resultBox.innerText = "서버 오류가 발생했어요 😢";
      return;
    }

    const data = await response.json();
    const { code, results } = data;

    resultBox.innerHTML = `
      <p><strong>게임 코드:</strong> ${code}</p>
      <p><strong>결과:</strong></p>
      <ol>${results.map(name => `<li>${name}</li>`).join("")}</ol>
    `;
  } catch (err) {
    resultBox.innerText = "네트워크 오류가 발생했어요.";
    console.error(err);
  }
});
