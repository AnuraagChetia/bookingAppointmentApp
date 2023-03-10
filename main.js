const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
// Listen for form submit
myForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/4e14ae0a3fb84ebf99aca12956f032db/appointmentData")
  .then(res => {
    for(let i=0;i<res.data.length;i++){
      display(res.data[i]);
      // console.log(res);
    }
  })
  .catch(err => {
    console.error(err); 
  })
  // const localStorageObj = localStorage;
  // const localstoragekeys  = Object.keys(localStorageObj)

  // for(var i =0; i< localstoragekeys.length; i++){
  //     const key = localstoragekeys[i]
  //     const userDetailsString = localStorageObj[key];
  //     const userDetailsObj = JSON.parse(userDetailsString);
  //     display(userDetailsObj)
  // }
})

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
    //save in local storage
    // localStorage.setItem(emailInput.value, JSON.stringify(newData));
    
    //save in crud
    axios.post("https://crudcrud.com/api/4e14ae0a3fb84ebf99aca12956f032db/appointmentData",newData)
    .then(res => {
      display(newData);
    })
    .catch(err => {
      console.error(err); 
    })
    // display(newData);
    nameInput.value = '';
    emailInput.value = '';
  }
}

function display(user){
  const parentNode = document.getElementById('users');
  var name = user.name;
  const childHTML = `<li id=${user.email}> ${user.name} - ${user.email} <button onclick = deleteUser('${user.email}','${user._id}')>Delete</button> <button onclick = editUser('${user.email}','${name}','${user._id}')>Edit</button> </li> `;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(emailId,userID){
  // localStorage.removeItem(emailId);
  axios.delete(`https://crudcrud.com/api/4e14ae0a3fb84ebf99aca12956f032db/appointmentData/${userID}`)
  .then(res => {
    console.log('Successful')
  })
  .catch(err => {
    console.error(`Error: ${err}`); 
  })
  removeUserFromScreen(emailId);
}

function removeUserFromScreen(emailId){
  const node = document.getElementById(emailId);
  node.remove();
}
function editUser(emailId,name,userId){
  document.getElementById('name').value = name;
  document.getElementById('email').value = emailId;
  deleteUser(emailId,userId); 
}
