function analyze() {
  const input = document.getElementById("inputText").value;
  const lines = input.split(/\n|\r/);
  const coins = [];

  lines.forEach(line => {
    if (line.includes("被選為 ❤️ 精選")) return;

    const cleanLine = line.replace(/[：:]/g, ":").replace(/\bVS\b|\bvs\b/g, "");
    const parts = cleanLine.split(/[、,\s]/);

    parts.forEach(p => {
      const word = p.trim().toUpperCase();
      if (word.match(/^[A-Z]{2,10}$/) && word !== "") {
        coins.push(word);
      }
    });
  });

  const count = {};
  coins.forEach(c => {
    if (!count[c]) count[c] = 0;
    count[c]++;
  });

  const sorted = Object.entries(count).sort((a,b) => b[1]-a[1]);

  let result = "【掃圖統計報告】\n出現次數排行：\n";
  sorted.forEach(([coin, times], idx) => {
    result += `${idx+1}. ${coin}：${times} 次\n`;
  });

  document.getElementById("outputArea").textContent = result;
}

function copyResult() {
  const text = document.getElementById("outputArea").textContent;
  if (text.trim()) {
    navigator.clipboard.writeText(text).then(() => {
      alert("統計結果已複製！");
    });
  }
}
