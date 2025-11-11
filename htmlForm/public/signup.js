// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAvjrpqs3ue7MzNCnpDiHjzf9JRfw7gyn0",
    authDomain: "login-ff42a.firebaseapp.com",
    projectId: "login-ff42a",
    storageBucket: "login-ff42a.firebasestorage.app",
    messagingSenderId: "898421433379",
    appId: "1:898421433379:web:e8cb2f9627a427203afd96"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig); 
 const auth=getAuth(app); 
 const signUp=document.getElementById("btnSignUp"); 


 signUp.addEventListener("submit",(event)=>{ 
  
  event.preventDefault();
   const email=document.getElementById("email").value;
  const password=document.getElementById("pass").value;
  const userName=document.getElementById("userName").value;
  const role=document.getElementById("selectRole").value;

  if(!userName || !email || !password || role===""){
    alert("Enter the required fields.");
    return;
  }

   createUserWithEmailAndPassword(auth, email, password,role)

   .then((userCredential)=> 
    { // Signed up
    const user = userCredential.user; 
    alert("Account Created !!") // ... 
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage) // ..
  });

})
