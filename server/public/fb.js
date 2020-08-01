function init() {
  console.log('here');
}

function storeCreds() {
  FB.api('/me', {}, resp => {
    console.log(resp);
    localStorage.setItem('sgdName', resp.name);
    localStorage.setItem('sgdFbId', resp.id);
    window.location = "/sms/select-contacts";
  });
}

function checkLoginState() {
  console.log('hoo yeah');
  FB.getLoginStatus(resp => {
    if (resp.status === 'connected') {
      storeCreds();
    } else {
      FB.login(response => {
        if (response.authResponse) {
          storeCreds();
        } else {
          console.log('user did not authorize');
        }
      });
    }
  })

}

window.checkLoginState = checkLoginState;
window.fbAsyncInit = function() {
  FB.init({
    appId      : '320035045798277',
    cookie     : true,
    xfbml      : true,
    version    : 'v7.0'
  });
  FB.AppEvents.logPageView();   
  init();

  FB.getLoginStatus(resp => {
    if (resp.status === 'connected') {
      console.log('you are connected');
    }
  })
};
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);

}(document, 'script', 'facebook-jssdk'));
