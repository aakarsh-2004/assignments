/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  const s1 = str1.split('');
  const s2 = str2.split('');

  s1.sort();
  s2.sort();
  str1 = s1.join('');
  str2 = s2.join('');

  return s1==s2;
}

module.exports = isAnagram;
