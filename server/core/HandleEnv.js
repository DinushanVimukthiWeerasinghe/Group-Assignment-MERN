import * as dotenv from 'dotenv'
dotenv.config()

const ENV={
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI
}
export default ENV