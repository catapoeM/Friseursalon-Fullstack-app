export const getHome = (req, res) => {
    res.json({message: 'Willkommen im ZC Salon'});
};

export const postHome = (req, res) => {
    const data = req.body;
    res.send(`Received POST data c: ${JSON.stringify(data)}`);
};

export const notFound = (req, res) => {
    res.status(404).send('<h1>Seite nicht gefunden</h1>');
};