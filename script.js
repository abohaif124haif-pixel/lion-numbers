// Lion Number Translator (Arabic + English)
const map = {
  // Arabic letters
  "ا": "1", "ب": "2", "ت": "3", "ث": "4", "ج": "5", "ح": "6", "خ": "7", 
  "د": "8", "ذ": "9", "ر": "10", "ز": "11", "س": "12", "ش": "13", "ص": "14",
  "ض": "15", "ط": "16", "ظ": "17", "ع": "18", "غ": "19", "ف": "20", "ق": "21",
  "ك": "22", "ل": "23", "م": "24", "ن": "25", "ه": "26", "و": "27", "ي": "28",

  // English uppercase
  "A": "'1", "B": "'2", "C": "'3", "D": "'4", "E": "'5", "F": "'6", "G": "'7",
  "H": "'8", "I": "'9", "J": "'10", "K": "'11", "L": "'12", "M": "'13", "N": "'14",
  "O": "'15", "P": "'16", "Q": "'17", "R": "'18", "S": "'19", "T": "'20", "U": "'21",
  "V": "'22", "W": "'23", "X": "'24", "Y": "'25", "Z": "'26",

  // English lowercase
  "a": "1", "b": "2", "c": "3", "d": "4", "e": "5", "f": "6", "g": "7",
  "h": "8", "i": "9", "j": "10", "k": "11", "l": "12", "m": "13", "n": "14",
  "o": "15", "p": "16", "q": "17", "r": "18", "s": "19", "t": "20", "u": "21",
  "v": "22", "w": "23", "x": "24", "y": "25", "z": "26"
};

const reverseMap = Object.fromEntries(Object.entries(map).map(([a,b]) => [b,a]));

function convertToTlon() {
  const text = document.getElementById("input").value.trim();
  const words = text.split(/\s+/);
  const result = words.map(word =>
    word.split("").map(ch => map[ch] || ch).join("-0-")
  ).join("-00-");
  document.getElementById("output").value = result;
}

function convertToArabic() {
  const text = document.getElementById("input").value.trim();
  const words = text.split("-00-");
  const result = words.map(word =>
    word.split("-0-").map(num => reverseMap[num] || num).join("")
  ).join(" ");
  document.getElementById("output").value = result;
}

function convertToEnglish() {
  document.getElementById("output").value = document.getElementById("input").value;
}
// --- Modals: open/close functions ---
function openArabicExplanation() {
  document.getElementById('arabicModal').style.display = 'block';
  // optional: focus inside modal
}
function closeArabicExplanation() {
  document.getElementById('arabicModal').style.display = 'none';
}

function openEnglishExplanation() {
  document.getElementById('englishModal').style.display = 'block';
}
function closeEnglishExplanation() {
  document.getElementById('englishModal').style.display = 'none';
}

// close modals when clicking outside content
window.addEventListener('click', function(e) {
  const a = document.getElementById('arabicModal');
  const b = document.getElementById('englishModal');
  if (e.target === a) a.style.display = 'none';
  if (e.target === b) b.style.display = 'none';
});

