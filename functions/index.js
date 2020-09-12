const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data,context) =>{
    //Since we can make any one an admin by the form unautharizely
    if(context.auth.token.admin != true){
        return{
            error:"Don't you Dare"
        }
    }

    //get user and add admin custom claims
    return admin.auth().getUserByEmail(data.email).then(user =>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true
        });
    }).then(() =>{
        return{
            message:`You Have Successly Add ${data.email} Ad an Admin!`
        }
    }).catch(err =>{
        return err;
    })
})