const fullName = document.getElementById('name');
const e_mail = document.getElementById('email');
const DM = document.getElementById('message');
const sent = document.getElementById('sent');
const invalid = document.getElementById('invalid');
const sendBtn = document.getElementById('send');

sendBtn.addEventListener('click', send);

fullName.addEventListener('input', () => { fullName.style.borderColor = "gray"; });
DM.addEventListener('input', () => { DM.style.borderColor = "gray"; });
e_mail.addEventListener('input', () => {
    e_mail.style.borderColor = "gray";
    invalid.innerHTML = "";
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function resetForm() { fullName.value = e_mail.value = DM.value = ""; }

function send() {
    if (fullName.value == "") fullName.style.borderColor = "red";
    else if (e_mail.value == "") e_mail.style.borderColor = "red";
    else if (DM.value == "") DM.style.borderColor = "red";
    else if (!validateEmail(e_mail.value.trim())) invalid.innerHTML = "Invalid E-mail !";
    else {
        emailjs.init("user_gvkiIDmzxTdDvQc05osis");
        var templateParams = {
            to_name: 'Wadie',
            from_name: fullName.value + ' ' + e_mail.value,
            message_html: DM.value
        };
        sendBtn.disabled = true;
        emailjs.send('service_466clze', 'template_RoQdIDHy', templateParams)
            .then(function (response) {
                sent.innerHTML = "Message sent successfully";
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                invalid.innerText = "Something went wrong !"
                console.log('FAILED...', error);
            });
        resetForm();
        sendBtn.disabled = false;
        setTimeout(() => { sent.innerHTML = ""; }, 4000);
    }
}
