// Register & Login Form: tắt/mở
const modal = document.querySelector('.js-modal');
const modalBody = document.querySelector(".js-modal__body");
const registerBtns = document.querySelectorAll('.js-register');
const loginBtns = document.querySelectorAll('.js-login');
const backBtns = document.querySelectorAll('.js-back-btn');
const registerForm = document.querySelector('.js-regis-auth-form');
const loginForm = document.querySelector('.js-login-auth-form');

function showRegisterForm() {
    modal.classList.add('open');
    registerForm.classList.add('open');
    loginForm.classList.remove('open');
}

function showLoginForm() {
    modal.classList.add('open');
    loginForm.classList.add('open');
    registerForm.classList.remove('open');
}

function hideForm() {
    modal.classList.remove('open');
    registerForm.classList.remove('open');
    loginForm.classList.remove('open');
}

for (const registerBtn of registerBtns) {
    registerBtn.addEventListener('click', showRegisterForm);
}

for (const loginBtn of loginBtns) {
    loginBtn.addEventListener('click', showLoginForm);
}

for (const backBtn of backBtns) {
    backBtn.addEventListener('click', hideForm);
}

modal.addEventListener('click', hideForm);

modalBody.addEventListener('click', function(event) {
    event.stopPropagation(modalBody);
})

//Yêu thích sản phẩm
const favoriteBtns = document.querySelectorAll('.js-product-item__like');

function favoriteProduct() {
    var isLiked = this.classList.contains('product-item__like--liked');
    if (isLiked) {
        this.classList.remove('product-item__like--liked');
    } else {
        this.classList.add('product-item__like--liked');
    }
}

for (favoriteBtn of favoriteBtns) {
    favoriteBtn.addEventListener('click', favoriteProduct)
}

// Login with Google
const loginGoogleBtns = document.querySelectorAll('.js-login-google');

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

for (const loginGoogleBtn of loginGoogleBtns) {
    loginGoogleBtn.addEventListener('click', onSignIn);
}

//Login Facebook
function statusChangeCallback(response) { // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response); // The current login status of the person.
    if (response.status === 'connected') { // Logged into your webpage and Facebook.
        testAPI();
    } else { // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}


function checkLoginState() { // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) { // See the onlogin handler
        statusChangeCallback(response);
    });
}


window.fbAsyncInit = function() {
    FB.init({
        appId: '359469145803979',
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: 'v3.0' // Use this Graph API version for this call.
    });


    FB.getLoginStatus(function(response) { // Called after the JS SDK has been initialized.
        statusChangeCallback(response); // Returns the login status.
    });
};

function testAPI() { // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

const loginFacebook = document.querySelector('.js-facebook-login');

loginFacebook.addEventListener('click', checkLoginState);