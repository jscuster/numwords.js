//Copyright 2016, Jason Custer
// Released under the MIT License. 
//Enjoy.

var number2Words = (function(x) {
var sounds = {},
ones = [],
tens = [],
groups = [],
allReady = false,

prepareWords = function() {
names = "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty fourty fifty sixty seventy eighty ninety thousand million billion, trillion, quadrillion, quintillion, sextillion, septillion, octillion, nonillion, decillion, undecillion, duodecillion, tredecillion, quattuordecillion, quindecillion, sexdecillion, septendecillion, octodecillion, novemdecillion, vigintillion".split(" ");
//set up ones.
for (var i = 0; i < 19; i++) {
ones[i] = names[i];
} //i
//set up tens
for (var i = 19; i < 27; i++) {
tens[i-19] = names[i];
} //i
//groups: thousand, million, billion
for (var i = 27; i < names.length; i++) {
groups[i-27] = names[i];
} //i
}, //prepareWords

splitNumber = function(x) {
var res = [],
i, j, ptr;
x=(x+"").split("");
while (x.length % 3 !== 0) x.unshift("0");
ptr = x.length - 1;
for (i = 0; ptr >= 0; i++) {
res[i] = [];
for (j = 2; j >= 0; j--) {
res[i][j] = x[ptr--] * 1;
} //j
} //i
return res;
}, //splitNumber

get3Words = function(x, l3, skipPunctuation) {
var r = "",
splt = skipPunctuation ? " " : "-";
if (x[0] > 0) r=r + ones[x[0]-1] + " ";
if (x[0] > 0 || l3) r=r + "hundred ";
if (x[1] === 1) {
r = r + ones[x[2] + 9] + " ";
} else {
if (x[1] > 1) {
r = r + tens[x[1] - 2] + " ";
if (x[2] > 0) r = r + splt;
} //if
if (x[2] > 0) r = r + ones[x[2]-1] + " ";
} //if
return r.trim();
}, //get3Words

getWords = function(x, skipPunctuation) {
x = splitNumber(x);
var ptr = -1,
tmp,
r,
punc = skipPunctuation ? "" : ",";
r="";
for (i = 0; i < x.length; i++) {
tmp = get3Words(x[i], i > 0, skipPunctuation);
if (ptr >= 0) tmp = tmp + " " + groups[ptr] + punc;
ptr++;
if (ptr >= groups.length) ptr--;
r = tmp + " " + r;
} //i
r = r.trim();
tmp=r.replace("  ", " ");
while (tmp != r) {
r=tmp;
tmp=r.replace("  ", " ");
} //while
return r;
}; //getWords

prepareWords();
return getWords;
})(); //number2Words