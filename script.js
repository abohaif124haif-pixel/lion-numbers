// تحويل النصوص إلى لغة TLON (لغة الأرقام الأسدية)

function convertToTlon() {
  const input = document.getElementById("input").value.trim();
  if (!input) return alert("الرجاء إدخال نص أولاً.");
  document.getElementById("output").value = encodeToTlon(input);
}

function convertToArabic() {
  const input = document.getElementById("input").value.trim();
  if (!input) return alert("Please enter TLON numbers first.");
  document.getElementById("output").value = decodeFromTlonToArabic(input);
}

function convertToEnglish() {
  const input = document.getElementById("input").value.trim();
  if (!input) return alert("Please enter TLON numbers first.");
  document.getElementById("output").value = decodeFromTlonToEnglish(input);
}

// ======================
// جداول الترميز
// ======================

// خريطة الحروف العربية
const arabicMap = {
  'ا':1,'ب':2,'ت':3,'ث':4,'ج':5,'ح':6,'خ':7,'د':8,'ذ':9,
  'ر':10,'ز':11,'س':12,'ش':13,'ص':14,'ض':15,'ط':16,'ظ':17,
  'ع':18,'غ':19,'ف':20,'ق':21,'ك':22,'ل':23,'م':24,'ن':25,
  'ه':26,'و':27,'ي':28,'ة':29,'ؤ':30,'ئ':31
};

// خريطة الحروف الإنجليزية
const englishMap = {
  "A": "'1", "B": "'2", "C": "'3", "D": "'4", "E": "'5", "F": "'6", "G": "'7",
  "H": "'8", "I": "'9", "J": "'10", "K": "'11", "L": "'12", "M": "'13", "N": "'14",
  "O": "'15", "P": "'16", "Q": "'17", "R": "'18", "S": "'19", "T": "'20", "U": "'21",
  "V": "'22", "W": "'23", "X": "'24", "Y": "'25", "Z": "'26",

  "a": "1", "b": "2", "c": "3", "d": "4", "e": "5", "f": "6", "g": "7",
  "h": "8", "i": "9", "j": "10", "k": "11", "l": "12", "m": "13", "n": "14",
  "o": "15", "p": "16", "q": "17", "r": "18", "s": "19", "t": "20", "u": "21",
  "v": "22", "w": "23", "x": "24", "y": "25", "z": "26"
};

// ======================
// دوال التحويل
// ======================

function encodeToTlon(text) {
  return text
    .split(' ')
    .map(word =>
      word.split('').map(ch => {
        if (arabicMap[ch]) return arabicMap[ch];
        if (englishMap[ch]) return englishMap[ch];
        return ch;
      }).join('-0-')
    )
    .join('-00-');
}

function decodeFromTlonToArabic(tlon) {
  const reverseArabic = Object.fromEntries(
    Object.entries(arabicMap).map(([k, v]) => [v.toString(), k])
  );

  return tlon.split('-00-').map(word =>
    word.split('-0-').map(num => reverseArabic[num] || '?').join('')
  ).join(' ');
}

function decodeFromTlonToEnglish(tlon) {
  // نعمل نسختين للعكس: واحدة للحروف الصغيرة والثانية للكبار
  const reverseEnglishLower = {};
  const reverseEnglishUpper = {};

  for (const [key, value] of Object.entries(englishMap)) {
    if (value.startsWith("'")) {
      reverseEnglishUpper[value.replace("'", "")] = key;
    } else {
      reverseEnglishLower[value] = key;
    }
  }

  return tlon.split('-00-').map(word =>
    word.split('-0-').map(num => {
      if (num.startsWith("'")) {
        return reverseEnglishUpper[num.replace("'", "")] || '?';
      }
      return reverseEnglishLower[num] || '?';
    }).join('')
  ).join(' ');
}

// ======================
// نوافذ الشرح (المودال)
// ======================

function openArabicExplanation() {
  document.getElementById("arabicModal").style.display = "block";
  document.getElementById("arabicModal").setAttribute("aria-hidden", "false");
}

function closeArabicExplanation() {
  document.getElementById("arabicModal").style.display = "none";
  document.getElementById("arabicModal").setAttribute("aria-hidden", "true");
}

function openEnglishExplanation() {
  document.getElementById("englishModal").style.display = "block";
  document.getElementById("englishModal").setAttribute("aria-hidden", "false");
}

function closeEnglishExplanation() {
  document.getElementById("englishModal").style.display = "none";
  document.getElementById("englishModal").setAttribute("aria-hidden", "true");
}
