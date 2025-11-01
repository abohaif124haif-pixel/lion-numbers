// Simple Lion Number translator (demo version)
const map = {
  "ا": "1", "ب": "2", "ت": "3", "ث": "4", "ج": "5", "ح": "6", "خ": "7", 
  "د": "8", "ذ": "9", "ر": "10", "ز": "11", "س": "12", "ش": "13", "ص": "14",
  "ض": "15", "ط": "16", "ظ": "17", "ع": "18", "غ": "19", "ف": "20", "ق": "21",
  "ك": "22", "ل": "23", "م": "24", "ن": "25", "ه": "26", "و": "27", "ي": "28"
};

const reverseMap = Object.fromEntries(Object.entries(map).map(([a,b]) => [b,a]));

function convertToTlon() {
  const text = document.getElementById("input").value.trim();
  const words = text.split(/\s+/);
  const result = words.map(word =>
    word.split("").map(ch => map[ch] || ch).join("-2-")
  ).join("-22-");
  document.getElementById("output").value = result;
}

function convertToArabic() {
  const text = document.getElementById("input").value.trim();
  const words = text.split("-22-");
  const result = words.map(word =>
    word.split("-2-").map(num => reverseMap[num] || num).join("")
  ).join(" ");
  document.getElementById("output").value = result;
}

function convertToEnglish() {
  document.getElementById("output").value = document.getElementById("input").value;
}
