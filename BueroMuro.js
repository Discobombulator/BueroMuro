let fs = require('fs')
let data = fs.readFileSync("Buero_input.txt", "utf8")
let string_input = data.split('\n')

str1 = string_input[0]
str2 = string_input[1]

console.log(str1)
console.log(str2)

str1_len = str1.length
str2_len = str2.length

new_mass = []
StopTable = []

let j;

for(j = 0; j < str2.length - 1; j++)
  new_mass[str2.charAt(j)] = j + 1

suffshift = []
BueroSign = []

for (j = 0; j <=str2_len; j++) {
  BueroSign[j] = 0
  suffshift[j] = str2_len

}

let BueroMaxIndex;
let BueroMaxSign;

for (j = 1; j < str2_len; j++) {
    if (j <= BueroMaxSign)
        BueroSign[j] = Math.min(BueroMaxSign - j + 1, BueroSign[j - BueroMaxIndex])

    while (j + BueroSign[j] < str2_len && str2.charAt(str2_len - 1 - BueroSign[j]) === str2.charAt(str2_len - 1 - (j + BueroSign[j])))
        BueroSign[j]++;

    if (j + BueroSign[j] - 1 > BueroMaxSign) {
        BueroMaxIndex = j;
        BueroMaxSign = j + BueroSign[j] - 1;

    }
}

for (j = str2_len - 1; j > 0; j--)
  suffshift[str2_len - BueroSign[j]] = j;

r = 0;
 for (j = 1; j <= str2_len - 1; j++)
  if ((j + BueroSign[j]) === str2_len)
     for( ; r <= j; r++)
       if (suffshift[r] === str2_len) suffshift[r] = j;


i = 0
BueroEdge = 0

while(i <= str1_len - str2_len) {
  j = str2_len - 1

  while(j >= BueroEdge && str1.charAt(i+j) === str2.charAt(j))
    j--

  if (j < BueroEdge) {
    console.log(i + 1)
    console.log(str2)
    BueroEdge = str2_len - suffshift[0]
    j = -1
    i += suffshift[0];

  } else {
    BueroEdge = 0

    if (!new_mass[str1.charAt(i + str2_len - 1)])
      StopTable[str1.charAt(i + j)] = 0

    else
      StopTable[str1.charAt(i + j)] = new_mass[str1.charAt(i + str2_len - 1)]
    i = Math.max((i + suffshift[j+1]), (i + j + 1 - StopTable[str1.charAt(i+j)]))
    
  }
}