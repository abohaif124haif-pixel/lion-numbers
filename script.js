// 🦁 خريطة TLON الأصلية (بدون تغيير)
const arabicMap = {
  'ا':1,'ب':2,'ت':3,'ث':4,'ج':5,'ح':6,'خ':7,'د':8,'ذ':9,
  'ر':10,'ز':11,'س':12,'ش':13,'ص':14,'ض':15,'ط':16,'ظ':17,
  'ع':18,'غ':19,'ف':20,'ق':21,'ك':22,'ل':23,'م':24,'ن':25,
  'ه':26,'و':27,'ي':28,'ة':29,'ؤ':30,'ئ':31
};

const englishMap = {
  'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,
  'j':10,'k':11,'l':12,'m':13,'n':14,'o':15,'p':16,'q':17,
  'r':18,'s':19,'t':20,'u':21,'v':22,'w':23,'x':24,'y':25,'z':26
};

// تحويل الرقم إلى مفتاح (عكسي)
const arabicReverse = Object.fromEntries(Object.entries(arabicMap).map(([k,v]) => [String(v), k]));
const englishReverse = Object.fromEntries(Object.entries(englishMap).map(([k,v]) => [String(v), k]));

// 🧩 تحويل إلى TLON
function convertToTlon() {
  const input = document.getElementById('input').value.trim();
  let result = '';
  const words = input.split(/\s+/);

  for (let w = 0; w < words.length; w++) {
    const word = words[w];
    let encodedLetters = [];

    for (const char of word) {
      if (arabicMap[char]) encodedLetters.push(arabicMap[char]);
      else if (englishMap[char.toLowerCase()]) {
        if (char === char.toUpperCase() && char.match(/[A-Z]/))
          encodedLetters.push("'" + englishMap[char.toLowerCase()]);
        else encodedLetters.push(englishMap[char.toLowerCase()]);
      }
    }
    result += encodedLetters.join('-0-');
    if (w < words.length - 1) result += '-00-';
  }

  document.getElementById('output').value = result;
}

// 🦁 TLON → Arabic
function convertToArabic() {
  const input = document.getElementById('input').value.trim();
  const words = input.split('-00-');
  const decodedWords = [];

  for (const word of words) {
    const numbers = word.split('-0-');
    let letters = '';

    for (const num of numbers) {
      // 👇 هنا التعديل الذكي
      if (arabicReverse[num]) letters += arabicReverse[num];
      // لو مو موجود في العربية نخليه كما هو أو فراغ
      else letters += '';
    }
    decodedWords.push(letters);
  }

  document.getElementById('output').value = decodedWords.join(' ');
}

// TLON → English
function convertToEnglish() {
  const input = document.getElementById('input').value.trim();
  const words = input.split('-00-');
  const decodedWords = [];

  for (const word of words) {
    const numbers = word.split('-0-');
    let letters = '';

    for (let num of numbers) {
      if (num.startsWith("'")) {
        num = num.slice(1);
        if (englishReverse[num]) letters += englishReverse[num].toUpperCase();
      } else if (englishReverse[num]) letters += englishReverse[num];
    }
    decodedWords.push(letters);
  }

  document.getElementById('output').value = decodedWords.join(' ');
}
