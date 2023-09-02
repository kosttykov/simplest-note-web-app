module.exports = (controllerMethod) => {
    return async (req, res) => {
        try {
            await controllerMethod(req, res);
        } catch (error) {
            res.status(500).json({ error: 'An error occured.' });
        }
    };
};