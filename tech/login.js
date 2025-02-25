function togglePassword(fieldId) {
    var field = document.getElementById(fieldId);
    field.type = (field.type === "password") ? "text" : "password";
}

function generateCaptcha(inputId, displayId) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var captcha = '';
    for (var i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById(displayId).innerText = captcha;
    document.getElementById(inputId).value = '';
}

function sendOTP(formId, otpBoxId, resendBtnId) {
    var otp = Math.floor(100000 + Math.random() * 900000);
    sessionStorage.setItem('otp', otp);
    alert('OTP Sent: ' + otp);
    document.getElementById(formId).style.display = 'none';
    document.getElementById(otpBoxId).style.display = 'block';
    setTimeout(function() {
        document.getElementById(resendBtnId).style.display = 'block';
    }, 30000);
}

function verifyOTP(inputId, otpBoxId, formId, errorMsgId) {
    var enteredOTP = document.getElementById(inputId).value;
    var storedOTP = sessionStorage.getItem('otp');
    if (enteredOTP === storedOTP) {
        alert('OTP Verified! Proceeding...');
        document.getElementById(otpBoxId).style.display = 'none';
        document.getElementById(formId).submit();
    } else {
        document.getElementById(errorMsgId).innerText = 'Invalid OTP. Try again.';
    }
}

function showSignup() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('signup-box').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
}



 window.onload = function() {
            generateCaptcha('captcha-login', 'captcha-display-login');
            generateCaptcha('captcha-signup', 'captcha-display-signup');
        };


        window.onload = function() {
            const container = document.querySelector('.container');
            container.classList.add('slide-in');
        };
        