
function analyze() {
  const input = document.getElementById("inputText").value;
  const lines = input.split(/\n|\r/);
  const coins = [];
  const favorites = [];

  lines.forEach(line => {
    const cleanLine = line.replace(/[：:]/g, ":");

    if (cleanLine.includes("❤️:")) {
      const loveCoin = cleanLine.split("❤️:")[1].trim().split(/[、,\s]/);
      loveCoin.forEach(c => {
        if (c) favorites.push(c.toUpperCase().trim());
      });
    } else {
      const parts = cleanLine.split(/[、,\s]/);
      parts.forEach(p => {
        if (p.match(/^[A-Za-z]{2,10}$/)) {
          coins.push(p.toUpperCase().trim());
        }
      });
    }
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

  if (favorites.length > 0) {
    const uniqFav = [...new Set(favorites)];
    result += "\n被選為 ❤️ 精選：\n- " + uniqFav.join("\n- ");
  }

  document.getElementById("outputArea").textContent = result;
}
