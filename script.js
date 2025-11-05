// Lion Number Translator (Arabic + English)
const map = {
  // Arabic
  "ا":"1","ب":"2","ت":"3","ث":"4","ج":"5","ح":"6","خ":"7",
  "د":"8","ذ":"9","ر":"10","ز":"11","س":"12","ش":"13","ص":"14",
  "ض":"15","ط":"16","ظ":"17","ع":"18","غ":"19","ف":"20","ق":"21",
  "ك":"22","ل":"23","م":"24","ن":"25","ه":"26","و":"27","ي":"28",
  // English uppercase (apostrophe-prefixed)
  "A":"'1","B":"'2","C":"'3","D":"'4","E":"'5","F":"'6","G":"'7",
  "H":"'8","I":"'9","J":"'10","K":"'11","L":"'12","M":"'13","N":"'14",
  "O":"'15","P":"'16","Q":"'17","R":"'18","S":"'19","T":"'20","U":"'21",
  "V":"'22","W":"'23","X":"'24","Y":"'25","Z":"'26",
  // English lowercase
  "a":"1","b":"2","c":"3","d":"4","e":"5","f":"6","g":"7",
  "h":"8","i":"9","j":"10","k":"11","l":"12","m":"13","n":"14",
  "o":"15","p":"16","q":"17","r":"18","s":"19","t":"20","u":"21",
  "v":"22","w":"23","x":"24","y":"25","z":"26"
};

const reverseMap = Object.fromEntries(Object.entries(map).map(([k,v]) => [v,k]));

// helper: detect if a character is Arabic
function isArabicChar(ch){
  return /[\u0600-\u06FF]/.test(ch);
}
// helper: detect if a character is English letter
function isEnglishChar(ch){
  return /[A-Za-z]/.test(ch);
}

// 1) Encode: any Arabic or English input -> TLON numbers
function convertToTlon(){
  const text = document.getElementById('input').value.trim();
  if(!text) return;
  const words = text.split(/\s+/);
  const result = words.map(word =>
    word.split('').map(ch => map[ch] || ch).join('-0-')
  ).join('-00-');
  document.getElementById('output').value = result;
}

// 2) Decode TLON -> Arabic (only tokens that map to Arabic letters will be kept)
function convertToArabic(){
  const text = document.getElementById('input').value.trim();
  if(!text) { document.getElementById('output').value = ''; return; }
  const words = text.split('-00-');
  const resultWords = words.map(word => {
    const tokens = word.split('-0-');
    const letters = tokens.map(tok => {
      const ch = reverseMap[tok] || '';
      // keep only Arabic letters
      return isArabicChar(ch) ? ch : '';
    }).join('');
    return letters;
  });
  document.getElementById('output').value = resultWords.join(' ');
}

// 3) Decode TLON -> English (keep only English letters; uppercase handled via apostrophe tokens)
function convertToEnglish(){
  const text = document.getElementById('input').value.trim();
  if(!text) { document.getElementById('output').value = ''; return; }
  const words = text.split('-00-');
  const resultWords = words.map(word => {
    const tokens = word.split('-0-');
    const letters = tokens.map(tok => {
      const ch = reverseMap[tok] || '';
      // keep only English letters (A-Z / a-z)
      return /[A-Za-z]/.test(ch) ? ch : '';
    }).join('');
    return letters;
  });
  document.getElementById('output').value = resultWords.join(' ');
}


// --- Modals: open/close functions ---
function openArabicExplanation(){ 
  const m = document.getElementById('arabicModal');
  m.style.display = 'block';
  m.setAttribute('aria-hidden','false');
}
function closeArabicExplanation(){ 
  const m = document.getElementById('arabicModal');
  m.style.display = 'none';
  m.setAttribute('aria-hidden','true');
}

function openEnglishExplanation(){ 
  const m = document.getElementById('englishModal');
  m.style.display = 'block';
  m.setAttribute('aria-hidden','false');
}
function closeEnglishExplanation(){ 
  const m = document.getElementById('englishModal');
  m.style.display = 'none';
  m.setAttribute('aria-hidden','true');
}

// close modals when clicking outside content
window.addEventListener('click', (e) => {
  const a = document.getElementById('arabicModal');
  const b = document.getElementById('englishModal');
  if(e.target === a) closeArabicExplanation();
  if(e.target === b) closeEnglishExplanation();
});
