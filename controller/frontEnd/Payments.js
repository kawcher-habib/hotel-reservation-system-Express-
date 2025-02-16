require('dotenv').config('.env');
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.SSL_STORE_ID;
const store_password = process.env.SSL_STORE_PASSWORD;
const is_live = false;  // sandbox

const paymentWithSSl = (req, res) =>{

    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:8000/api/ssl/success',
        fail_url: 'http://localhost:8000/api/ssl/fail',
        cancel_url: 'http://localhost:8000/api/ssl/cancel',
        ipn_url: 'http://localhost:8000/api/ssl/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
    sslcz.init(data).then(apiResponse =>{
        console.log(apiResponse);
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.redirect(GatewayPageURL);
        console.log('redirect url: ', GatewayPageURL);
    })
    
}


const paymentSuccess = (req, res) =>{

}
const paymentFail = (req, res) =>{

}
const paymentCancel = (req, res) =>{

}
const paymentInp = (req, res) =>{

}

module.exports = {
    paymentWithSSl,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentInp
}