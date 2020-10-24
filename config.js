const ACCESS_LEVELS = Object.freeze({
    ADMIN: "admin",
    USER: "user",
});

const JWT_SECRET_TOKEN = '2kl3h5j209foslk3209sudlkr23kjth08uoisjlekhr2ooisuodf8shl2ig8owhs';
const JWT_TOKEN_EXPIRE_TIME = 20 * 60; // In Seconds.
const PORT = 12345;

module.exports = {
    ACCESS_LEVELS,
    JWT_SECRET_TOKEN,
    JWT_TOKEN_EXPIRE_TIME,
    PORT
}