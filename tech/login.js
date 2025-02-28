function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button') && !event.target.matches('.dropdown-button *')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
  };
  



  
  
  // Initialize the calendar when the DOM is loaded
  document.addEventListener('DOMContentLoaded', initCalendar);
  
  document.addEventListener("DOMContentLoaded", function () {
    const signInButton = document.querySelector(".sign-in-button");
  
    if (signInButton) {
        signInButton.addEventListener("click", function () {
            window.location.href = "login.html"; // Replace with your actual file name
        });
    }
  });
  
  
  

    // Function to validate role selection
    function validateRoleSelection(roleId) {
        const roleSelect = document.getElementById(roleId);
        if (!roleSelect.value) {
            alert("Please select a role (Admin, Faculty, or Student) to continue.");
            event.preventDefault();
            return false;
        }
        return true;
    }

      // Set up form field toggling based on role selection
      document.addEventListener('DOMContentLoaded', function() {
        function setupRoleSelection(roleId, formId) {
            const roleSelect = document.getElementById(roleId);
            const form = document.getElementById(formId);
            const formInputs = form.querySelectorAll('input, button[type="submit"]');
            
            // Disable all fields initially except the role selector
            formInputs.forEach(input => {
                if (input.id !== roleId) {
                    input.disabled = true;
                }
            });
            
            // Enable fields when role is selected
            roleSelect.addEventListener('change', function() {
                const isRoleSelected = !!this.value;
                formInputs.forEach(input => {
                    if (input.id !== roleId) {
                        input.disabled = !isRoleSelected;
                    }
                });
            });
        }

            // Apply to both forms
            setupRoleSelection('login-role', 'login-form');
            setupRoleSelection('signup-role', 'signup-form');
        });
    


     









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
        