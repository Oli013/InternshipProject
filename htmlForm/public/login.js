// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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
  
  
  const login=document.getElementById("btnLogin");
  login.addEventListener("click",function(event){
    event.preventDefault();
    const email=document.getElementById("emailLog").value;
  const password=document.getElementById("pass1").value;

    if(!email || !password){
        alert("Please fill all fields.");
        return;
    }

   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
       alert("Login Successful !!")
    const user = userCredential.user;
    window.location.href="home.html";
 
  
  })
  .catch((error) => {
  
    const errorCode = error.code;
    const errorMessage = error.message;
  });


})
