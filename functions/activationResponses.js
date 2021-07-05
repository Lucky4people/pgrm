const admin = require("firebase-admin");

function getCss() {
 
  return `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap');
      body {
    font-family: 'Roboto';
    font-weight: 400;
    color: rgb(0, 0, 0);
    }
    html{
      height: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      }

      @font-face {
    font-family: "Haymaker";
    font-style: normal;
    font-weight: 400;
    /* Браузер сначала попробует найти шрифт локально */
    src: local("Haymaker"),
    url("http://pgrm.pp.ua/fonts/Haymaker.woff") format("woff");
    }
    h1{
    font-family: Haymaker,sans-serif !important;
    font-weight: 100;
    font-size: 50px;
    margin: 20px auto;
    text-align: center;
    }
    ::placeholder { 
    color: #ccc !important;
    font-size: 0.8rem;
    font-weight: 100px;
    }

    .login {
    min-width: 315px;
    background: #F9F9F9;
    padding: 20px;
    border-radius: 15px;
    display: block;
    margin: 2px auto;
    box-shadow: #0000002b 0px 0px 9px 2px;
    max-width: 400px;
    }
    label.top_text {
    display: block;
    text-align: center;
    color: #478698;
    font-size: 20px;
    font-weight: 900;
    vertical-align: middle;
    padding-bottom: 10px;
    }
    .top_text img{
    width: 30px;
    vertical-align: middle;
    margin-right: 10px;
    }
    input.inp {
    font-family: "MaisonNeue", "Segoe UI", "Helvetica Neue", -apple-system, system-ui, BlinkMacSystemFont, Roboto, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: inherit;
    color: #63578a !important;
    font-weight: 600;
    min-width: 80px;
    display: block;
    width: 100%;
    height: 42px;
    padding: 10px 30px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dfdfe8;
    border-radius: 20px;
    -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    }
    a.login_btn {
    margin-top: 30px;
    padding: 10px 30px;
    background: #589aca;
    border-radius: 5px;
    display: block;
    color: white;
    font-weight: 100;
    font-size: 15px;
    }
    .firebaseui-card-footer {
          display: none;
      }
      .firebaseui-card-header{
          display: none;
      }
      .firebaseui-container{
          background: none;
      }
      .mdl-shadow--2dp{
          box-shadow: none;
      }
      .firebaseui-phone-number {
    display: flex;
    background: white;
    border-radius: 6px;
    border: #efeeee solid 2px;
    padding: 0px 30px;
    }
    .firebaseui-form-actions {

    text-align: center !important;

    }
    .mdl-button--raised.mdl-button--colored:hover {
    background-color: #6190b7;
    }
    .mdl-button--raised.mdl-button--colored {
    background: #3b7eb7;
    color: rgb(255,255,255);
    text-transform: none;
    border-radius: 8px;
    font-size: 16px;
    height: 40px;
    padding: 0px 110px;
    font-weight: 400;
    }
    .firebaseui-button{
    margin: 0;
    }
    p.price {
    position: relative;
    top: -50px;

    color: red;
    font-size: 20px;
    font-weight: bold;
    margin: 0;
    }
    img.img_product {
    display: block;
    width: 100%;
    margin: 0 auto;
    border: #efeeee solid 2px;
    border-radius: 20px;
    }
    p.date_product {
    color: #aaaaaa;
    font-size: 14px;
    padding: 0px 26px;
    float: left;
    font-weight: 400;
    border-right: #dcdcdc solid 2px;
    }
    p.date_product.last{
    border-right: none;
    }
    p.date_product label {
    color: rgb(84 84 84);
    padding-top: 5px;
    display: block;
    font-weight: 600;
    }
    p.date_product.last.active label {
    color: #75b54d;
    }
    .info {
    padding-bottom: 20px;
    width: 100%;
    margin: 0 auto;
    }
    p.name_product a{

    font-size: 20px;
    font-weight: 500;
    color:#478698;
    text-decoration: none;
    }
    .img {
    clear: both;
    }
    p.name_product {
    text-align: center;
    }

    .border{
    margin: 10px 0;
    border-bottom: #e2e2e2 solid 2px;
    display: block;
    }
    .mdl-button--raised.mdl-button--colored {
    background: #3b7eb7;
    color: rgb(255,255,255);
    text-transform: none;
    border-radius: 8px;
    font-size: 16px;
    height: 40px;
    padding: 0px 110px;
    font-weight: 400;
    display: block;
    }
    @media screen and (max-width: 992px) {
    p.date_product {
      color: #aaaaaa;
      font-size: 14px;
      padding: 0px 20px;
      float: left;
      font-weight: 400;
      border-right: #dcdcdc solid 2px;
    }
    }

    /* On screens that are 600px or less, set the background color to olive */
    @media screen and (max-width: 600px) {
    p.date_product {
      color: #aaaaaa;
      font-size: 14px;
      padding: 0px 15px;
      float: left;
      font-weight: 400;
      border-right: #dcdcdc solid 2px;
    }
    }
    </style>
  `

}

exports.generateSuccessActivationHTML = function(details) {
  // function generateSuccessActivationHTML(details) {
  
      return `
          <!doctype html>
          <head>
              <title>PGRM Clothing: Success activation</title>
          </head>
          <!-- The core Firebase JS SDK is always required and must be listed first -->
          <script src="/__/firebase/8.3.2/firebase-app.js"></script>
          <!-- update the version number as needed -->
          <script src="/__/firebase/8.3.2/firebase-auth.js"></script>
          <script src="/__/firebase/8.3.2/firebase-database.js"></script>
          <!-- TODO: Add SDKs for Firebase products that you want to use
               https://firebase.google.com/docs/web/setup#available-libraries -->
          <script src="/__/firebase/8.3.2/firebase-analytics.js"></script>
  
          <!-- Initialize Firebase -->
          <script src="/__/firebase/init.js"></script>
  
  
          <script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth__uk.js"></script>
          <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
  
          <script type="text/javascript">
         
          initApp = function() {
              firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  var displayName = user.displayName;
                  var uid = user.uid;
                  var phoneNumber = user.phoneNumber;
                  var providerData = user.providerData;
  
                   
                    document.getElementById('userDetails').textContent = JSON.stringify({
                      displayName: displayName,
                      phoneNumber: phoneNumber,
                      providerData: providerData
                    }, null, '  ');
                  
                } 
              }, function(error) {
                console.log(error);
              });
            };
          
            window.addEventListener('load', function() {
              initApp()
            });
          </script>
          <body>
              <h4>Success! You successfuly activated ${details}</h4>
              <h4>Product is linked to user:</h4>
              <pre id="userDetails"></pre>
          </body>
      </html>
      `
    }
  
    exports.generateActivatedProductHtml = function(userId, productId) {
      
      const path = "nfcLinks";

      return admin.auth().getUser(userId).then((userRecord) => {
        return userRecord.phoneNumber
      }).then((phoneNumber) => {
        
        return admin.database().ref(path).child(productId).once("value").then((snapshot) => {

            if(snapshot.exists()) {
              
              let productDetails = snapshot.val();
              const productPath = 'products/' + productDetails.type + '/' + productDetails.name;
              const productPathRef = admin.database().ref(productPath);


              return productPathRef.once("value").then((productMainDetails) => {

                
                const product = {
                    id: productId,
                    name: productDetails.name + ' ' + productDetails.color,
                    creation: productDetails.created,
                    price: productMainDetails.val().price,
                    image: productMainDetails.val().image
                }

              return generateUserPageHtml(product, phoneNumber);

              });

              


          } else {
              console.log("generateUserPage inner 2");
              return generateUserErrorHtml();
          }


        });

      });



 



      // return `
      //    <!doctype html>
      //       <head>
      //           <title>PGRM Clothing: Product already activated</title>
      //       </head>
  
      //       <script type="text/javascript">
            
      //         initApp = function() {
      //             document.location.href = '/user/?userId=${ownerId}';
      //         };
    
      //         window.addEventListener('load', function() {
      //           initApp()
      //         });
      //       </script>
  
      //       <body>
                
      //       </body>
      //   </html>
      // `
  }
  
  function generateUserPageHtml(product, phoneNumber) {
    
    // var htmlProducts = "";
    // Array.from(productsArray).forEach(value => {
    //     htmlProducts = htmlProducts +`<h4>${value.name} ${value.color} ${value.type}</h4>`;
    // });

//     <!doctype html>
//     <head>
//         <title>PGRM Clothing: User page</title>
//     </head>
    
//     <body>
//         <h4>User phone: ${phoneNumber}</h4>
//         <h5>User products:</h5>
//         ${htmlProducts}
//     </body>
// </html>

    return `
       
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>PGRM product activation</title>
     
        <script src="/__/firebase/8.3.2/firebase-app.js"></script>
        <script src="/__/firebase/8.3.2/firebase-analytics.js"></script>
    
        <script src="/__/firebase/init.js"></script>
    
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
          ${getCss()}
        </head>
        
        <body>
            <div class="container">
                <!-- Hero Title -->
                <h1>POGROM</h1>
                <!-- Hero Title Info -->
                <div class="login">
                    <label class="top_text"><img src="/img/logo_pogrom.svg" alt="logo">Hello</label>
                    <span class="border"></span>
                    <div class="description">
                        <p class="name_product"><label><a href="https://www.instagram.com/pgrm.clo/">${product.name}</a></label></p>
                    </div>
                    <div class="info">
                        <p class="date_product">Дата создания: <br><label>${product.creation}</label></p>
                        <p class="date_product lastPrice">Цена: <br><label>${product.price} грн.</label></p>
                        <p class="date_product last active">Активация <br><label>Активирован</label></p>
                        <p class="date_product last active">Номер телефона владельца <br><label>${phoneNumber}</label></p>
                        
                        <div style="clear:both;"></div>
                    </div>
                    <div style="clear:both;"></div>
                    <div class="img">
                        <a href="https://www.instagram.com/pgrm.clo/">
                            <img class="img_product" src="${product.image}" />
                        </a>
                        
                    </div>
                    
                    
                </div>
            </div>
        </body>
    </html>
   
    `
  }

  exports.generateProductActivationHtml = function(product) {
  
      return `
      <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>PGRM product activation</title>
      <!-- The core Firebase JS SDK is always required and must be listed first -->
      <script src="/__/firebase/8.3.2/firebase-app.js"></script>
      <!-- update the version number as needed -->
      <script src="/__/firebase/8.3.2/firebase-auth.js"></script>
      <script src="/__/firebase/8.3.2/firebase-database.js"></script>
      <!-- TODO: Add SDKs for Firebase products that you want to use
           https://firebase.google.com/docs/web/setup#available-libraries -->
      <script src="/__/firebase/8.3.2/firebase-analytics.js"></script>
  
      <!-- Initialize Firebase -->
      <script src="/__/firebase/init.js"></script>
  
  
      <script src="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth__uk.js"></script>
      <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
      <script type="text/javascript">
      var userId;
      initApp = function() {
          firebase.auth().signOut().then(() => {
              // Sign-out successful.
            }).catch((error) => {
              // An error happened.
            });
        };
      
          var uiConfig = {
              callbacks: {
                  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    
                    userId = authResult.user.uid;
                    console.log("userId = "+userId);
                    
                    document.location.href = '/user/?id=${product.id}&userId='+userId;
                    return false;
                  },
                  uiShown: function() {
                    // The widget is rendered.
                    // Hide the loader.
                    // document.getElementById('loader').style.display = 'none';
                  }
                },
          signInSuccessUrl: '/user/?id=${product.id}&userId='+userId,
          signInOptions: [
              {
                  provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                  defaultCountry: 'UA',
                  recaptchaParameters: {
                      size: 'invisible' // 'invisible' or 'compact'
                  }
              }
          ],
          // defaultNationalNumber: '380631234567',
          // loginHint: '+380631112233',
          // whitelistedCountries: ['UA', '+380'],
          // tosUrl and privacyPolicyUrl accept either url string or a callback
          // function.
          // Terms of service url/callback.
          tosUrl: '<your-tos-url>',
          // Privacy policy url/callback.
          privacyPolicyUrl: function() {
            window.location.assign('<your-privacy-policy-url>');
          }
        };
  
        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
        window.addEventListener('load', function() {
          initApp()
        });
      </script>
      </head>
      ${getCss()}
      <body>
          <div class="container">
              <!-- Hero Title -->
              <h1>POGROM</h1>
              <!-- Hero Title Info -->
              <div class="login">
                  <label class="top_text"><img src="/img/logo_pogrom.svg" alt="logo">Реєстрація</label>
                  <span class="border"></span>
                  <div id="firebaseui-auth-container"></div>
                  <div class="description">
                      <p class="name_product"><label><a href="https://www.instagram.com/pgrm.clo/">${product.name}</a></label></p>
                  </div>
                  <div class="info">
                      <p class="date_product">Дата создания: <br><label>${product.creation}</label></p>
                      <p class="date_product lastPrice">Цена: <br><label>${product.price} грн.</label></p>
                      <p class="date_product last active">Активация <br><label>Не активирован</label></p>
                      <div style="clear:both;"></div>
                  </div>
                  <div style="clear:both;"></div>
                  <div class="img">
                      <a href="https://www.instagram.com/pgrm.clo/">
                          <img class="img_product" src="${product.image}" />
                      </a>
                      
                  </div>
                  
                  
              </div>
          </div>
      </body>
  </html>
      `
  }