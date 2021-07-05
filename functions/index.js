const functions = require("firebase-functions");
const admin = require("firebase-admin");
const activationResponses = require('./activationResponses');

const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(functions.config().telegram.token, {
	telegram: { webhookReply: true },
});

// error handling
bot.catch((err, ctx) => {
	// functions.logger.error('[Bot] Error', err)
	return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err)
});

// initialize the commands
// bot.command('/start', (ctx) => ctx.reply('Hello! Send any message and I will copy it.'))
// copy every message and send to the user
// bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message))

// bot.start((ctx) => ctx.reply('Welcome')); //ответ бота на команду /start
// bot.help((ctx) => ctx.reply('Send me a sticker')); //ответ бота на команду /help
// bot.on('sticker', (ctx) => ctx.reply('')); //bot.on это обработчик введенного юзером сообщения, в данном случае он отслеживает стикер, можно использовать обработчик текста или голосового сообщения
// bot.hears('hi', (ctx) => ctx.reply('Hey there')); // bot.hears это обработчик конкретного текста, данном случае это - "hi"
// bot.launch(); // запуск бота


function getStartReply(context, payload) {
    const chatId = context.chat.id;
    
    const modifiedPayload = payload.replace("-", "/");
        const path = "products/" + modifiedPayload;
        const ref = admin.database().ref(path);
        
        return ref.once("value").then(function (snapshot) {
            
            console.log("snapshot.exists() = "+snapshot.exists());

            if(snapshot.exists()) {
                
                const product = snapshot.val();
                functions.logger.error('product', product)
                const replyOptions = Markup.inlineKeyboard([
                    Markup.button.pay(`${product.price} грн.`),
                    Markup.button.url('Деталi...', 'http://telegraf.js.org')
                ])

                
                const invoice = {
                    chat_id: chatId, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
                    provider_token: "632593626:TEST:sandbox_i44069078098", // токен выданный через бот @SberbankPaymentBot 
                    start_parameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
                    title: product.name, // Название продукта, 1-32 символа
                    description: product.description, // Описание продукта, 1-255 знаков
                    currency: 'UAH', // Трехбуквенный код валюты ISO 4217
                    prices: [{ label: 'Цена', amount: product.price * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
                    photo_url: product.image, // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
                    photo_width: 960, // Ширина фото
                    photo_height: 980, // Длина фото
                    payload: { // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
                    unique_id: `${chatId}_${Number(new Date())}`,
                    provider_token: "632593626:TEST:sandbox_i44069078098"
                    },
                    need_name: true,
                    need_phone_number: true
                }
                
                return {
                    invoice: invoice,
                    replyOptions: replyOptions
                }

            } else {
                return {
                    message: `Product not found path = ${path}`
                }
            }
            
        })
    
  }

function getProductsById(product) {

    const path = "products/"+product;
    const ref = admin.database().ref(path);
        
    return ref.once("value").then(function (snapshot) {

        let buttons = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            // buttons.push({
            //     id: childSnapshot.key,
            //     name: childData.name,
            //     color: childData.color,
            //     type: childData.type,
            //     owner: childData.owner
            // });

            buttons.push(
                [Markup.button.callback(childSnapshot.key, `cat:${product}&product:${childSnapshot.key}`)]
            )

        });

        return buttons
    });


}

function getProductsButtons() {

    const path = "products";
    const ref = admin.database().ref(path);
        
    return ref.once("value").then(function (snapshot) {

        let buttons = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            // buttons.push({
            //     id: childSnapshot.key,
            //     name: childData.name,
            //     color: childData.color,
            //     type: childData.type,
            //     owner: childData.owner
            // });
            
            buttons.push(
                [Markup.button.callback(childSnapshot.key, `category:${childSnapshot.key}`)]
            )

        });

        return buttons
    });

}
  
//   bot.use(Telegraf.log())
 
bot.start((ctx) => {
// bot.command('start', async (ctx) => {
   
    

        return getStartReply(ctx, ctx.startPayload).then((response) => {
                
            if(ctx.startPayload == null || ctx.startPayload == "") {
                
                // const keyboard = Markup.inlineKeyboard([
                //     [Markup.button.callback('Coke', 'Coke')],
                //     [Markup.callbackButton(questions[players[userId]['last_question']].o2,"o2")],
                //     [Markup.callbackButton(questions[players[userId]['last_question']].o3,"o3")]
                //   ])

                return getProductsButtons().then((products) =>{

                    ctx.reply('Please, select product category:', {
                        parse_mode: 'HTML',
                        ...Markup.inlineKeyboard(
                            products
                        ).resize()
                    })

                });

            } else if(response.invoice != null) {
                console.log("getStartReply 2");
                ctx.replyWithInvoice(response.invoice, response.replyOptions);
            } else if(response.message != null) {
                console.log("getStartReply 3");
                ctx.reply(response.message);
            } else {
                console.log("getStartReply 4");
                ctx.reply(`Some error occured. Deep link path = ${ctx.startPayload}`);
            }
        });

   
});

bot.action(/category:.+/, (ctx) => {
    // return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)

    const category = ctx.match[0].split(':');
    console.log("CATEGORY ctx.match = "+ctx.match);
    console.log("CATEGORY category[1] = "+category[1]);

    return ctx.answerCbQuery(`Oh, ${category[1]}! Great choice`).then(() => {

        return getProductsById(category[1]).then((products => {
            ctx.reply(`${category[1]}:`, {
                parse_mode: 'HTML',
                ...Markup.inlineKeyboard(
                    products
                ).resize()
              })
        }))

    });


   

    

})

bot.action(/cat:.+&product:.+/, (ctx) => {
    // return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)

    // 'cat:bags&product:banana' 
    const dataSplit = ctx.match[0].split('&');
    const category = dataSplit[0].split(':')[1];
    const product = dataSplit[1].split(':')[1];

    const path = `${category}-${product}`;
    console.log("cat:.+&path:.+ "+path);


    return ctx.answerCbQuery(`Oh, ${product}! Great choice`).then(() => {

        return getStartReply(ctx, path).then((response) => {
        
            if(response.invoice != null) {
                ctx.replyWithInvoice(response.invoice, response.replyOptions);
            } else if(response.message != null) {
                ctx.reply(response.message);
            } else {
                ctx.reply(`Some error occured. Deep link path = ${ctx.startPayload}`);
            }
        })

    })
    

})

// bot.start((ctx) => getStartReply(ctx));
// bot.start((ctx) => {
    
// });

//   bot.start((ctx) => ctx.reply(`Deep link payload: ${ctx.startPayload}`))
//   bot.start((ctx) => ctx.replyWithInvoice(getInvoice(ctx.chat.id, ctx.startPayload), replyOptions));
//   bot.command('buy', (ctx) => ctx.replyWithInvoice(invoice, replyOptions))
// bot.on('message', ctx => ctx.reply('Not supported command'));
let orderInfo = null;

bot.on('pre_checkout_query', (ctx) => {
    orderInfo = ctx.preCheckoutQuery.order_info;
    ctx.answerPreCheckoutQuery(true);
})
bot.on('successful_payment', async (ctx, next) => { // ответ в случае положительной оплаты
    // console.log("ctx.callbackQuery");
    // console.log(ctx.callbackQuery);
    // console.log("ctx.shippingQuery");
    // console.log(ctx.shippingQuery);
    // console.log("ctx.answerShippingQuery");
    // console.log(ctx.answerShippingQuery);
    // console.log("ctx.precheckputQuery");
    // console.log(ctx.preCheckoutQuery);
    
    console.log("ORDER INFO:");
    console.log(orderInfo);
    
    await ctx.reply(`Супер! Дякуємо за ваш вибiр! Ми вже знаємо ваше iм'я (${orderInfo.name}) та номер телефону (${orderInfo.phone_number}). 

Тепер нам потрiбно створити вiдправлення через Нову Пошту. Будь ласка, напiшiть ваше мiсто та номер вiддiлення i ми одразу почнемо формувати вiдправлення. 

Наприклад: Львiв, 55:`)
})


// bot.on('inline_query', async (ctx) => {
//     const results = [
//       {
//         type: 'article',
//         id: 1,
//         title: "1",
//         photo_url: movie.poster
//       }  
//     ] 
      
    
//     return ctx.answerInlineQuery(results)
//   })

// bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => {
//     console.log("Nova poshta number = "+inlineQuery);
//     return answerInlineQuery({
//         type: 'article',
//         id: 'someID',
//         title: 'someTitle',
//         description: 'someDesc',
//         thumb_url: 'img_url',
//         url: 'url'
//     })
// });

// bot.launch();
  
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))







//   bot.hears('pay', (ctx) => { // это обработчик конкретного текста, данном случае это - "pay"
//     return ctx.replyWithInvoice(getInvoice(ctx.from.id)) //  метод replyWithInvoice для выставления счета  
//   })
  
//   bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)) // ответ на предварительный запрос по оплате
  

  
//   bot.launch()






// handle all telegram updates with HTTPs trigger
exports.echoBot = functions.https.onRequest(async (request, response) => {
	// functions.logger.log('Incoming message', request.body)
    // console.log('Incoming message', request.body);
	bot.handleUpdate(request.body, response).then((rv) => {
		// if it's not a request from the telegram, rv will be undefined, but we should respond with 200
        response.status(200).send(rv);

        // if(rv) {
        //     console.log("handleUpdate RV");
        //     return rv;
        // } else {
        //     console.log("handleUpdate RESPONSE");
        //     return response.sendStatus(200);
        // }
		// return !rv && response.sendStatus(200)
	})
});


admin.initializeApp({
    databaseURL: "https://pgrmclo-default-rtdb.firebaseio.com/"
});

exports.activateProduct = functions.https.onRequest((req, res) => {
    //id=aa26b38a-2a37-4fbe-a9b9-8d3f628bca8e&type=bags
    
    const productId = req.query.id;
    const linkPath = 'nfcLinks/' + productId;
    const ref = admin.database().ref(linkPath);
    var linkData;

    ref.once("value").then(function (snapshot) {
        if(snapshot.exists()) {
            const data = snapshot.val();
            return data;
        } else {
            res.status(200).send(generateEmptyHtml());
        }
        
    }).then((data) => {
        
        linkData = data;
        let productPath = 'products/' + data.type + '/' + data.name;
        var productPathRef = admin.database().ref(productPath);

        return productPathRef.once("value")
      }).then((productSnapshot) => {
        let productDetails = productSnapshot.val();
        // const details = productDetails.name + ' ' + linkData.color + ' ' + productDetails.price + ' ' + linkData.created + ' ' + productDetails.image;
        
        const product = {
            id: productId,
            name: productDetails.name + ' ' + linkData.color,
            creation: linkData.created,
            price: productDetails.price,
            image: productDetails.image
        }

        if(linkData.owner === undefined) {
            res.status(200).send(activationResponses.generateProductActivationHtml(product))
        } else {
            // Here show user details
            
            return activationResponses.generateActivatedProductHtml(linkData.owner, productId).then(html => {
                return res.status(200).send(html);
            });

            
        }
        
      });

  });

  exports.userDetails = functions.https.onRequest((req, res) => {

    
    const productId = req.query.id;
    const userId = req.query.userId;

    

    if(productId === undefined && userId !== undefined) {
        // generate user response
        console.log("generateUserPage with id = "+userId);
        generateUserPage(userId).then((htmlResponse) => {
            res.status(200).send(htmlResponse);
        });
    } else if(productId !== undefined && userId !== undefined) {
        // generate activation response
        console.log("generateActivationReponse with id = "+userId+" And product id = "+productId);
        generateActivationReponse(productId, userId).then((html) =>{
            res.status(200).send(html);
        });
    } else {
        // General error
        console.log("userDetails generateErrorHtml");
        return generateErrorHtml();
    }

    
  });

  exports.status = functions.https.onRequest((req, res) => {
    const linkPath = 'nfcLinks/';
    const ref = admin.database().ref(linkPath);
    ref.once("value").then((snapshot) => {

        var productsArray = [];
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            productsArray.push({
                id: childSnapshot.key,
                name: childData.name,
                color: childData.color,
                type: childData.type,
                owner: childData.owner
            });
        });

        const html = generateStatusPageHtml(productsArray);
        res.status(200).send(html);
        

    });
  });

  function generateActivationReponse(productId, userId) {

    const linkPath = 'nfcLinks/' + productId;
    const ref = admin.database().ref(linkPath);
    var linkData;

    return ref.once("value").then(function (snapshot) {
        if(snapshot.exists()) {
            const data = snapshot.val();
            return data;
        } else {
            // Error: such product doesn't exist
            console.log("Error: such product doesn't exist");
            return generateErrorHtml();
        }
        
    }).then((data) => {
        
        linkData = data;
        let productPath = 'products/' + data.type + '/' + data.name;
        var productPathRef = admin.database().ref(productPath);

        return productPathRef.once("value")
      }).then((productSnapshot) => {
        let productDetails = productSnapshot.val();
        const details = productDetails.name + ' ' + linkData.color + ' ' + productDetails.price + ' ' + linkData.created + ' ' + productDetails.image;
        
        if(linkData.owner === undefined) {
            ref.update({
                "owner": userId
            });
            
            return activationResponses.generateSuccessActivationHTML(details);
        } else {
            // error, user already written to
            console.log("error, user already written to");
            return generateErrorHtml();
        }
        
      });

  }

  function generateUserPage(userId) {
    
    const path = "nfcLinks";
    
    return admin.auth().getUser(userId).then((userRecord) => {
        return userRecord.phoneNumber
    }).then((phoneNumber) => {
        return admin.database().ref(path).orderByChild("owner").equalTo(userId).once("value").then((snapshot) => {
            if(snapshot.exists()) {
                
                var productsArray = [];
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    productsArray.push({
                        name: childData.name,
                        color: childData.color,
                        type: childData.type
                    });
                });

                return generateUserPageHtml(productsArray, phoneNumber);
            } else {
                console.log("generateUserPage inner 2");
                return generateUserErrorHtml();
            }
        });
    }).catch(error => {
        console.log("generateUserPage inner = "+error);
        return generateErrorHtml();
    //     console.error('Error fetching user data:', error)
    //     reject({status: 'error', code: 500, error})
    });
    
  }

  function generateUserPageHtml(productsArray, phoneNumber) {
    
    var htmlProducts = "";
    Array.from(productsArray).forEach(value => {
        htmlProducts = htmlProducts +`<h4>${value.name} ${value.color} ${value.type}</h4>`;
    });

    return `
        <!doctype html>
        <head>
            <title>PGRM Clothing: User page</title>
        </head>
        
        <body>
            <h4>User phone: ${phoneNumber}</h4>
            <h5>User products:</h5>
            ${htmlProducts}
        </body>
    </html>
    `
  }


  function generateUserErrorHtml() {
    return `
        <!doctype html>
        <head>
            <title>PGRM Clothing: User error</title>
        </head>
        <body>
            <h4>Error - no user found. Please, call support.</h4>
        </body>
    </html>
    `
  }


  function generateErrorHtml() {
    return `
        <!doctype html>
        <head>
            <title>PGRM Clothing: Activation error</title>
        </head>
        <body>
            <h4>Error activating product. Please, call support.</h4>
        </body>
    </html>
    `
  }

  

  function generateEmptyHtml() {
      return `
         <!doctype html>
            <head>
                <title>PGRM Clothing: Product not found</title>
            </head>
            <body>
                <h4>Product not found. Please, call support.</h4>
            </body>
        </html>
      `
  }


function generateStatusPageHtml(products) {
    var htmlProducts = "";
    
    Array.from(products).forEach(value => {
        htmlProducts = htmlProducts +`<h5>${value.name} ${value.color} ${value.type} | Owner = ${value.owner} | <a href="https://pgrm.com.ua/activate/?id=${value.id}" target="_blank">Activation link (NFC)</a></h5>`;
    });

    return `
        <!doctype html>
        <head>
            <title>PGRM Clothing: User page</title>
        </head>
        <body>
            <h4>Status page:</h4>
            <h5>All nfcLinks products:</h5>
            ${htmlProducts}
        </body>
    </html>
    `

}