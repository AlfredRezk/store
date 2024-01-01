let  btnPasswords = document.querySelectorAll(".password-btn");
btnPasswords = Array.from(btnPasswords)

btnPasswords.forEach((btn) =>
  btn.addEventListener("click", (e) => {

        e.target.classList.toggle('bi-eye-fill')
        e.target.classList.toggle('bi-eye-slash-fill')
        if( e.target.className.includes('bi-eye-fill')){
             // password input field type password
            e.target.previousElementSibling.setAttribute('type', 'password')

        }else if(e.target.className.includes('bi-eye-slash-fill')){
            // password input field type text
            e.target.previousElementSibling.setAttribute('type', 'text')
        }
    
  }),
);


let notifications = document.querySelectorAll('.alert')
notifications = Array.from(notifications)
console.log(notifications)
if(notifications.length>0){
  
  notifications.forEach(not=>{
    setTimeout(()=>{
      not.remove()
    }, 3000)
  })
}


ClassicEditor
.create( document.querySelector( '#editor' ) )
.then( editor => {
  console.log(editor)
} )
.catch( error => {
        console.error( error );
} );