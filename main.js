const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // get data from user
    let newData = {
      name: nameInput.value,
      email: emailInput.value
    }
    //if there is nothing saved at the start then create an empty array
    if(localStorage.getItem('data') == null){
      localStorage.setItem('data','[]');
    }
    //get old data and push new data to it
    let oldData = JSON.parse(localStorage.getItem('data'));
    oldData.push(newData);

    //save the old + new data
    localStorage.setItem('data', JSON.stringify(oldData));

    display();
  }
}

function display(){
  //create li element
  var li = document.createElement('li');
  //create a textNode with the user details
  var liNode = document.createTextNode(`${nameInput.value} ${emailInput.value}`);
  //append the textNode into the li
  li.appendChild(liNode);

  //create the container
  var ul = document.querySelector('.items');
  ul.appendChild(li);
}
