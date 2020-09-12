//add admin 
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole =  functions.httpsCallable('addAdminRole');
    addAdminRole({email:adminEmail}).then(result =>{
        console.log(result);
    })
    document.querySelector('#admin-email').value = '';
})
//listen to the user status check
auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(idTokenResult =>{
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        })
    //getting gallery data from the DB
    db.collection('gallery').onSnapshot(snapshot =>{
    setUpGallery(snapshot.docs);
},err =>{
    console.log(err.message);
});
    }else{
        setUpGallery([ ]);
        setupUI();
    }
})

//create gallery guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    db.collection('gallery').add({
        image:createForm['upload-gallery'].value,
        title:createForm['title-gallery'].value,
        content:createForm['content-gallery'].value
    }).then(() =>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset(); //reset is method of clearing the form
    },err =>{
        createForm.querySelector('.error').innerHTML = err.message;
    })
})


//signup 
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            gender:signUpForm['signup-gender'].value,
            age:signUpForm['signup-age'].value,
            bio:signUpForm['signup-bio'].value
        })
        // console.log(email,password);
        // console.log(cred.user);
    }).then(() =>{
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signUpForm.reset();
    }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click',(e =>{
    auth.signOut();
}))

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then(cred =>{
        // console.log(cred.user);
        // console.log('user logged In');

        //close and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})