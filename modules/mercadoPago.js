// Step 7

// const ??? = require(???)
const mercadoPago = require("mercadopago");

// const credential = ??? 
const credential = process.env.MP || "TEST-3645381466893064-070611-351447983b87f23645ba15f728ce6668-157889446"
// const credential = process.env.MP || "TEST-2449401199214952-070817-641cd778cb631f08a224f24bc5d7a345-377742754"
// let server = ???
let server = process.env.SERVER || "http://localhost:3030"
// const feedback = ???
const feedback =  `${server}/checkout/feedback`
// const failure = ???
// const pending = ???


const mp  = async (items, cuotes, shipping) => {
    try {
        // Magic
        mercadoPago.configure({
            access_token: credential
        })

        let config = {
            items,
            back_urls: {
                success: feedback,
                failure: feedback,
                pending: feedback
            },
            payment_methods: {
                installments: cuotes
            },
            auto_return: "approved",
            shipments: {
                cost: shipping,
                mode: "not_specified"
            }
        }

        let preferences = await mercadoPago.preferences.create(config);

        return preferences;
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp
