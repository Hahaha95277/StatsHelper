function countTargets() {
  const input = document.getElementById("inputText").value;
  const lines = input.split(/\n|\r/);
  const ignoreLines = lines.filter(line => !line.includes("被選為 ❤️ 精選"));
  const wordMap = {};

  ignoreLines.forEach(line => {
    const cleaned = line.replace(/VS|vs/g, "").replace(/[，、\s]+/g, ",");
    const words = cleaned.split(",");
    words.forEach(w => {
      const word = w.trim();
      if (word && word !== "") {
        wordMap[word] = (wordMap[word] || 0) + 1;
      }
    });
  });

  const sorted = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);
  let output = "統計結果：\n\n";
  sorted.forEach(([word, count]) => {
    output += `${word}：${count} 次\n`;
  });

  document.getElementById("result").textContent = output;
}

function copyResults() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("已複製統計結果！");
  });
}
