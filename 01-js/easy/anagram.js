/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1=str1.split(" ").join("").toLowerCase();
  str2=str2.split(" ").join("").toLowerCase();

  if(str1.length!=str2.length){
    return false;
  }
  for(let i=0; i<str1.length; i++){
    str2=str2.replace(str1[i],"");
  }

  if(str2.length==0){
    return true;
  }
  else{
    return false;
  }
}

module.exports = isAnagram;
console.log(isAnagram("Debit Card","Bad Credit"))