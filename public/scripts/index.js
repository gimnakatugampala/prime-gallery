const rowList = document.querySelector('.row');
const loggedInLinks = document.querySelectorAll('#logged-in');
const loggedOutLinks = document.querySelectorAll('#logged-out');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
// const Prev = document.querySelector('#preview-model');

//the setup gallery
const setUpGallery = (data) =>{
  if(data.length){
   let html = '';
   data.forEach(doc =>{
     const gallery = doc.data();
     const li = `
     <div class="col s12 m3">
     <div class="card">
         <div class="card-image" style="height:150px;overflow:hidden;">
         <img src=${gallery.image} >
         <span class="card-title">${gallery.title}</span>
         </div>
         <div class="card-content" style="position:relative;">

         <a class="btn-floating halfway-fab waves-effect waves-light red" style="position:absoulute;left:10%"><i class="material-icons">cloud_download</i></a>

         <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger admin" data-target="update-model" style="position:absoulute;left:30%;"><i class="material-icons">add</i></a>

         <a class="btn-floating halfway-fab waves-effect waves-light red admin" id="del" data-target="update-model" style="position:absoulute;left:50%;"><i class="material-icons">delete</i></a>

         <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" id="link-prev"data-target="preview-model" style="position:absoulute;left:70%;"><i class="material-icons">launch</i></a>
         <p >${gallery.content}</p>

         </div>
     </div>
     </div>
     `;
     html += li;
   })
   rowList.innerHTML = html;

  }else{
    rowList.innerHTML = '<h5 class="center-align">Signup To See The Gallery</h5>';
  }
}

const setupUI = (user) =>{
  if(user){
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
     db.collection('users').doc(user.uid).get().then(doc =>{
        let html = `
          <div>You are looged-in as : ${user.email}</div>
          <div>${doc.data().gender}</div>
          <div>You are ${doc.data().age} years old</div>
          <div>${doc.data().bio}</div>
          <div class="pink-text">${user.admin ? 'Admin': ''}</div>
        `;
        accountDetails.innerHTML = html;
     })
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{

    //if a user isn't an admin
    adminItems.forEach(item => item.style.display = 'none');

    accountDetails.innerHTML = '';

    loggedInLinks.forEach(item => item.style.display = 'none')
    loggedOutLinks.forEach(item => item.style.display = 'block')
  }
}

// //Preview Technology
// const PreviewMod = (data) =>{
// const preview = document.querySelector('#link-prev');
// preview.addEventListener('click',(e) =>{
//   let html = `
//       <div class="modal-content" style="position: relative;width: 100%;">
//       <h4 class="center-align">${data.data().title}</h4>
//       <img src=${data.data().image}style="width:50%;height:300px;">
//       <p style="position:absolute;left: 50%;top:20%;width: 50%;">${data.data().content}</p>
//     </div>
//   `;
//   Prev.innerHTML = html;
// })
// }



//initialze the modals
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    var element = document.querySelectorAll('select');
     M.FormSelect.init(element);

     var sideelems = document.querySelectorAll('.sidenav');
     M.Sidenav.init(sideelems);
  });