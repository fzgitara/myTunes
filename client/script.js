 // This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
  if (response.status === 'connected') {
      // Logged into your app and Facebook.

//     testAPI();
//       // axios.post('http://localhost:3000/test', {tokenFB: response.authResponse.accessToken})
//       // .then((data) => {
//       //   console.log(data)
//       // })
//     $.post('http://localhost:3000/myTunes', {tokenFB: response.authResponse.accessToken}, 
//     (data, status) => {
//       if(status === 'success') {
//         console.log(data)
//         // window.location.href = 'home.html';
//         let arr = ['via vallen', 'Glenn Fredly', 'Cecha'];
//         arr.forEach((searchText) => {
//           searchSong(searchText)
//         })
//       }
//     })
//   } else {
//     // The person is not logged into your app or we are unable to tell.
//     document.getElementById('status').innerHTML = 'Please log ' +
//       'into this app.';

      // testAPI();
      console.log(response.authResponse.accessToken)
      axios.post('http://localhost:3000/myTunes', {}, {headers: {token: response.authResponse.accessToken}})
      .then((response) => {
        console.log(response)
      localStorage.setItem('token' , response.data.TokenJWT )
      })
      // var xhr = new XMLHttpRequest()
      // xhr.open("POST", "http://localhost:3000/myTunes", true)
      // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xhr.send(`accessToken=${response.authResponse.accessToken}`)
      // $.post('http://localhost:3000/myTunes', {tokenFB: response.authResponse.accessToken}, 
      // (data, status) => {
      //   if(status === 'success') {
      //     console.log(data)
      //   }
      // })
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }

  }


  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '246539295888893',
    cookie     : true,  // enable cookies to allow the server to access 
                          // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

  // Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https:ls//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.

  function testAPI() {
    // console.log('Welcome!  Fetching your information.... ');
    // FB.api('/me',{fields: ['name', 'gender', 'email', 'music']}, function(response) {
    //   console.log('------->>', response)
    //   console.log('Successful login for: ' + response.name);
    //   document.getElementById('status').innerHTML =
    //     'Thanks for logging in, ' + response.name + '!';
    // });
  }


function logout() {
    FB.logout(function(response) {
        console.log('logout')
        statusChangeCallback(response)
    })
}



// getRequest iTunes API
function generateSuccessHTMLOutput(response) {
	return  '<h4>Result</h4>' + 
	'<h5>Data:</h5>' + 
	'<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>'; 
}

function generateErrorHTMLOutput(error) {
	return  '<h4>Result</h4>' + 
	'<h5>Message:</h5> ' + 
	'<pre>' + error.message + '</pre>' +
	'<h5>Status:</h5> ' + 
	'<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
	'<h5>Headers:</h5>' + 
	'<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' + 
	'<h5>Data:</h5>' + 
	'<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>'; 
}


function performGetRequest2() {
  var resultElement = document.getElementById('getResult2');
  var todoId = document.getElementById('todoId').value;
  resultElement.innerHTML = '';
  var keyword = ['via vallen'] // Seharusnya Data dari facebook
  let results = []
  axios.get(`https://itunes.apple.com/search?term=${todoId}`)
  .then(function (response) {
      response.data.results.map( data => {
        $('#getResult2').append(`
          <p>${data.artistName} : ${data.trackName}</p>
        `)
      })
    // resultElement.innerHTML = generateSuccessHTMLOutput();
  })
  .catch(function (error) {
    console.log(error);
      // resultElement.innerHTML = generateErrorHTMLOutput(error);
  });
}

document.getElementById('todoInputForm').addEventListener('submit', performPostRequest);


// End of getRequest iTunes API

function validateSinger(name, resName) {
  name = name.toLowerCase();
  resName = resName.toLowerCase();
  if(name == resName) {
    return true
  } else {
    return false
  }
}

function songFilter(name, json) {
  for(let i = 0; i<json.results.length; i++) {
    if(validateSinger(name, json.results[i].artistName)) {
      // console.log(json.results[i].artistName+' - '+json.results[i].collectionCensoredName)
    } else {
      i=json.length
    }
  }
}

function searchSong(singer) {
  fetch(`https://itunes.apple.com/search?term=${singer}`)  /// fetch pattern
  .then (function (data){
    return data.json()
  })
  .then((data) => {
    // console.log(data.results[0])
    songFilter(singer, data)
  })
}

