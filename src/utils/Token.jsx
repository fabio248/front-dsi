import jwt_decode from "jwt-decode";

export function decoderToken(token){
    return jwt_decode(token);
}

export function hasExpiredToken(token){

    const exp = decoderToken(token);

    const currentData = new Date().getTime();

    if (exp <= currentData) {
        return true;
    }

    return false;
}