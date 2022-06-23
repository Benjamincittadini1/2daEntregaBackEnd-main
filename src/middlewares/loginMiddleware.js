function login(req, res, next) {
    const admin = true;
    try {
        if (admin) {
            next();
        }
        else {
            res.status(401).json({ error: 'No tienes permisos para acceder a este recurso' }
            )
        }
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
}

export default login;