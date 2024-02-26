/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.split(" ").join("").toLowerCase();
  let check=true;
  
  for(let i=0;i<str.length;i++){
    if(str[i]<'a' || str[i]>'z'){
      str = str.replace(str[i], '');
    }
  }

  for(let i=0; i<(str.length)/2; i++){
    if(str[i]==str[(str.length)-1-i]){
      check=true;
    }
    else{
      check=false;
      break;
    }
  }

  if(check==false){
    return false;
  }
  else{
    return true;
  }
}

module.exports = isPalindrome;
console.log(isPalindrome("hello ol!leh"))
