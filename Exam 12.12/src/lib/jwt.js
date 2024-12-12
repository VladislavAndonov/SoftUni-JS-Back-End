import util from "util";
import jsonwebtoken from "jsonwebtoken";

const verify = util.promisify(jsonwebtoken.verify);
const sign = util.promisify(jsonwebtoken.sign);

const jwt = {
    verify,
    sign
};

export default jwt;