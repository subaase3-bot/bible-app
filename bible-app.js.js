// PAGE SWITCH
function showPage(id){
document.getElementById("emotion").style.display="none";
document.getElementById("bible").style.display="none";
document.getElementById("topics").style.display="none";
document.getElementById("daily").style.display="none";
document.getElementById("bookmarks").style.display="none";
document.getElementById(id).style.display="block";
}

// BOOK LIST
const books=[
"Genesis","Exodus","Leviticus","Numbers","Deuteronomy",
"Joshua","Judges","Ruth","1 Samuel","2 Samuel",
"1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
"Nehemiah","Esther","Job","Psalms","Proverbs",
"Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations",
"Ezekiel","Daniel","Hosea","Joel","Amos",
"Obadiah","Jonah","Micah","Nahum","Habakkuk",
"Zephaniah","Haggai","Zechariah","Malachi",
"Matthew","Mark","Luke","John","Acts",
"Romans","1 Corinthians","2 Corinthians","Galatians",
"Ephesians","Philippians","Colossians","1 Thessalonians",
"2 Thessalonians","1 Timothy","2 Timothy","Titus",
"Philemon","Hebrews","James","1 Peter","2 Peter",
"1 John","2 John","3 John","Jude","Revelation"
];

// BOOK SELECT
let bookSelect=document.getElementById("bookSelect");
books.forEach(b=>{
let o=document.createElement("option");
o.text=b;
bookSelect.add(o);
});

// CHAPTER SELECT
let chapterSelect=document.getElementById("chapterSelect");
for(let i=1;i<=150;i++){
let o=document.createElement("option");
o.text=i;
chapterSelect.add(o);
}

// DEMO BIBLE DATABASE
const bibleDB={
"John":{
"3":{
"16":"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
}
},
"Philippians":{
"4":{
"6":"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
}
},
"Psalms":{
"23":{
"1":"The Lord is my shepherd; I shall not want."
}
}
};

// LOAD CHAPTER
function loadChapter(){
let book=bookSelect.value;
let chapter=chapterSelect.value;
let html="";

if(bibleDB[book] && bibleDB[book][chapter]){
for(let v in bibleDB[book][chapter]){
html+=`<div class='verse'><b>${book} ${chapter}:${v}</b><br>${bibleDB[book][chapter][v]} <br><button onclick="bookmark('${book} ${chapter}:${v}')">Bookmark</button></div>`;
}
}else{
html="Chapter not available in demo database.";
}

document.getElementById("bibleText").innerHTML=html;
}

// EMOTION AI
function emotionAI(){

let text=document.getElementById("emotionInput").value.toLowerCase();

let verses={
"anxiety":"Philippians 4:6",
"peace":"John 14:27",
"fear":"Isaiah 41:10",
"grief":"Psalm 34:18",
"anger":"James 1:19",
"gratitude":"1 Thessalonians 5:18",
"loneliness":"Deuteronomy 31:6"
};

let result="";

for(let e in verses){
if(text.includes(e)){
result+=`<div class='verse'><b>${verses[e]}</b></div>`;
}
}

if(result===""){
result="<div class='verse'>Try words like peace, fear, anxiety.</div>";
}

document.getElementById("emotionResult").innerHTML=result;

}

// DAILY VERSE
const dailyVerses=[
"Psalm 23:1 – The Lord is my shepherd",
"Isaiah 41:10 – Do not fear",
"John 3:16 – God loved the world",
"Philippians 4:6 – Do not be anxious"
];

document.getElementById("dailyVerse").innerText=
dailyVerses[new Date().getDate()%dailyVerses.length];

// BOOKMARK SYSTEM
function bookmark(v){

let list=JSON.parse(localStorage.getItem("verses")||"[]");

list.push(v);

localStorage.setItem("verses",JSON.stringify(list));

loadBookmarks();
}

function loadBookmarks(){

let list=JSON.parse(localStorage.getItem("verses")||"[]");

let html="";

list.forEach(v=>{
html+=`<div class="verse">${v}</div>`;
});

document.getElementById("savedVerses").innerHTML=html;
}

loadBookmarks();