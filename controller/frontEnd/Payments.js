require('dotenv').config('.env');
const SSLCommerzPayment = require('sslcommerz-lts');
const Payment = require('../../models/frontEnd/Payment');
const store_id = process.env.SSL_STORE_ID;
const store_password = process.env.SSL_STORE_PASSWORD;
const is_live = false;  // sandbox

const paymentWithSSl = async (req, res) => {

    const tran_id = 'REF' + Math.round(Math.random(1, 100));

    const body = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: tran_id,
        user_id: 'user102392',
        country: 'Bangladesh',
        city: 'Dhaka'
    }

    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:8000/api/payment/ssl/success/${tran_id}`,
        fail_url: `http://localhost:8000/api/payment/ssl/fail/${tran_id}`,
        cancel_url: `http://localhost:8000/api/payment/ssl/cancel/${tran_id}`,
        ipn_url: 'http://localhost:8000/api/payment/ssl/ipn',
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

    await Payment.create(body);

    const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
    try {

        const apiResponse = await sslcz.init(data);

        if (!apiResponse.GatewayPageURL) {
            return res.status(400).json({ message: "Failed to get payment URL" });
        }

        const valId = apiResponse.sessionkey;

        await Payment.update(
            { val_id: valId },
            {
                where: {
                    tran_id: tran_id
                }
            }
        )
        console.log(apiResponse);

        res.redirect(apiResponse.GatewayPageURL);
    } catch (error) {
        console.error("Payment initiation failed: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

}


const paymentSuccess = (req, res) => {
    console.dir(req.path);
    const tranId = req.param('tranid');

     Payment.update(
        { status: 'Success' },
        {
            where: {
                tran_id: tranId
            }
        }
    )

}
const paymentFail = (req, res) => {

    const tranId = req.param('tranid')

    Payment.update(
        { status: 'Fail' },
        {
            where: {
                tran_id: tranId
            }
        }
    )

}
const paymentCancel = (req, res) => {
    const tranId = req.param('tranid')

    Payment.update(
        { status: 'Cancel' },
        {
            where: {
                tran_id: tranId
            }
        }
    )

}
const paymentInp = (req, res) => {
    const tranId = req.param('tranid')

    Payment.update(
        { status: 'Inp' },
        {
            where: {
                tran_id: tranId
            }
        }
    )
}

module.exports = {
    paymentWithSSl,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    paymentInp
}