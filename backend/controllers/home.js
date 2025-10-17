export const getHome = (req, res) => {
    res.send('Hello GET!');
};

export const postHome = (req, res) => {
    const data = req.body;
    res.send(`Received POST data c: ${JSON.stringify(data)}`);
};