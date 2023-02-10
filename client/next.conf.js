import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    env: {
        REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL,
        REACT_APP_HOME_PIC_URL = process.env.REACT_APP_HOME_PIC_URL,
        REACT_APP_ABOUT_PIC_URL = process.env.REACT_APP_ABOUT_PIC_URL,
        REACT_APP_BASE_PIC_URL = process.env.REACT_APP_BASE_PIC_URL,
    },
}
