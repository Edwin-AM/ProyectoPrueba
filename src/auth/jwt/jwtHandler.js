import jwt_decode from 'jwt-decode'

export const decryptToken = (jwt) => {
    let decodedToken = jwt_decode(jwt)
    return decodedToken
}
