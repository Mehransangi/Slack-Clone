import "dotenv/config"

export const ENV = {
    PORT : process.env.PORT || 8080,
    MONOGO_URI : process.env.MONOGO_URI,
    NODE_ENV : process.env.NODE_ENV
}