import crypto from 'crypto';

const getHome = (req, res) => {
    console.log(req.session, ' req.session vvv')
    if (!req.session.visitorId) {
        req.session.visitorId = crypto.randomUUID();
    }    
    res.json({message: 'HomePage'});
};

const postHome = (req, res) => {
    const data = req.body;
    res.send(`Received POST data c: ${JSON.stringify(data)}`);
};

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {getHome, postHome, notFound}