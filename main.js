// DOM Elements
const passwordBox = document.getElementById('password');
const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const charlong = document.getElementById('charlong');
const generateBtn = document.getElementById('generator');
const clipboard = document.getElementById('clipboard');

// Options to include different characters
const includeLowercase = () => {
  const random = Math.floor(Math.random() * 26 + 97);
  return String.fromCharCode(random);
};

const includeUppercase = () => {
  const random = Math.floor(Math.random() * 26 + 65);
  return String.fromCharCode(random);
};

const includeNumbers = () => {
  const random = Math.floor(Math.random() * 10 + 48);
  return String.fromCharCode(random);
};

const includeSymbols = () => {
  const random = Math.floor(Math.random() * 15 + 33);
  return String.fromCharCode(random);
};

// Generate password and update box value.
const generatePassword = () => {

  // Validation less than 6 characters
  if(charlong.value < 6){
    return alert('Your password must be at least 6 characters long');
  }

  // Validation more than 20 characters
  if(charlong.value > 20){
    return alert('Your password must be less than 20 characters longs');
  }

  // Retrieve rules checked
  const rules = [];

  if(lowercase.checked) rules.push(includeLowercase);
  if(uppercase.checked) rules.push(includeUppercase);
  if(numbers.checked) rules.push(includeNumbers);
  if(symbols.checked) rules.push(includeSymbols);

  // Validate at least one option is checked
  if(!rules.length){
    return alert('You must select at least 1 option');
  }

  let password = '';

  // Run a random function from the rules array
  for(i = 0; i < charlong.value; i++){
    const includeRule = Math.floor(Math.random() * rules.length);
    password += rules[includeRule]();
  }

  // Update the password box value with end result
  passwordBox.value = password;
  clipboard.classList.remove('is-static');
  clipboard.classList.add('is-dark', 'is-outlined');
};

const copyPassword = () => {
  if (passwordBox.value) {
    passwordBox.select();
    document.execCommand('copy');
    passwordBox.blur();

    const tag = document.createElement('div');
    tag.classList.add('tag', 'is-warning');
    tag.textContent = 'Copied!'
    tag.style.position = 'absolute';
    tag.style.bottom = '1.75rem';
    tag.style.right = '1rem';

    clipboard.parentElement.appendChild(tag);
    setTimeout(() => {
      clipboard.parentElement.removeChild(tag);
    }, 1000);
  }
};

// EVENT LISTENER
generateBtn.addEventListener('click', generatePassword);
clipboard.addEventListener('click', copyPassword);
