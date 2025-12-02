

const getHome = (req, res) => {
    res.json(req.session);
};

const postHome = (req, res) => {
    const data = req.body;
    res.send(`Received POST data c: ${JSON.stringify(data)}`);
};

const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};

export {getHome, postHome, notFound}