/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let cnt=0;
    const n = str.length;
    for(let i=0; i<n; i++){
      const char = str[i].toLowerCase();
      if
      (char == 'a' ||
      char== 'e' ||
      char== 'i' ||
      char== 'o' ||
      char == 'u'
    ) {
      cnt++;
    }
    }
    return cnt;
}

module.exports = countVowels;