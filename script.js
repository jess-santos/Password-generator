// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Function to prompt user for password options
function getPasswordOptions() {
  var length = parseInt(prompt("Enter the length of the password (between 8 and 128 characters):"));

  // Validate the length input
  while (isNaN(length) || length < 8 || length > 128) {
    length = parseInt(prompt("Please enter a valid length between 8 and 128:"));
  }

  var includeLowercase = confirm("Include lowercase characters?");
  var includeUppercase = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");

  // Return an object with user options
  return {
    length: length,
    includeLowercase: includeLowercase,
    includeUppercase: includeUppercase,
    includeNumeric: includeNumeric,
    includeSpecial: includeSpecial
  };
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();
  var availableChars = [];
  var guaranteedChars = [];
  var generatedPassword = '';

  if (options.includeLowercase) {
    availableChars = availableChars.concat(lowerCasedCharacters);
    guaranteedChars.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeUppercase) {
    availableChars = availableChars.concat(upperCasedCharacters);
    guaranteedChars.push(getRandom(upperCasedCharacters));
  }

  if (options.includeNumeric) {
    availableChars = availableChars.concat(numericCharacters);
    guaranteedChars.push(getRandom(numericCharacters));
  }

  if (options.includeSpecial) {
    availableChars = availableChars.concat(specialCharacters);
    guaranteedChars.push(getRandom(specialCharacters));
  }

  for (var i = 0; i < options.length; i++) {
    var randomChar = getRandom(availableChars);
    generatedPassword += randomChar;
  }

  // Ensure at least one of each selected character type is included
  for (var j = 0; j < guaranteedChars.length; j++) {
    generatedPassword = generatedPassword.replace(guaranteedChars[j], getRandom(guaranteedChars));
  }

  return generatedPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);
