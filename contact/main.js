var fullName =document.getElementById('name');
var e_mail =document.getElementById('email');
var DM =document.getElementById('message');

document.getElementById('name').addEventListener('input',function(){
    fullName.style.borderColor="gray";
});
document.getElementById('email').addEventListener('input',function(){
    e_mail.style.borderColor="gray";
    document.getElementById('invalid').innerHTML="";
});
document.getElementById('message').addEventListener('input',function(){
    DM.style.borderColor="gray";
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function send(){
    if (fullName.value=="")fullName.style.borderColor="red";else if(e_mail.value=="")e_mail.style.borderColor="red";
    else if(DM.value=="")DM.style.borderColor="red";else if(!validateEmail(e_mail.value.trim())) 
    document.getElementById('invalid').innerHTML="Invalid E-mail !" ;
    else{
    var form={
        name:fullName.value,
        email:e_mail.value,
        message:DM.value
    }
    emailjs.init("user_gvkiIDmzxTdDvQc05osis");
    var templateParams = {
    to_name: 'Wadie',
    from_name: fullName.value+' '+e_mail.value,
    message_html: DM.value
    };
    emailjs.send('gmail', 'template_RoQdIDHy', templateParams)
    .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
    console.log('FAILED...', error);
    });
    document.getElementById('name').value="";
    document.getElementById('email').value="";
    document.getElementById('message').value="";
    document.getElementById('sent').innerHTML="Message sent successfully";
    setTimeout(()=>{
        document.getElementById('sent').innerHTML="";
    },3000);
    }
}