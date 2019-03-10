import * as express from 'express';
import * as cors from 'cors';
import * as libs from './libs';

const app = express();
//app.use(cors);

app.get('/', (req, res) => { 
    return res.json({ message: 'Hello World' });
});

app.get('/invoice', (req, res) => {
    console.log("/invoice called");
    const address = libs.generatePayment(1);
    return res.json({
        invoice: `bitcoin:${address}?amount=${req.query.amount}`
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});