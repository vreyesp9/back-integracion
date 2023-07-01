const user = encodeURIComponent('victor1');

module.exports = {
    local: true,
    port: 4000,

    //MONGO////
    mongoUrl: 'mongodb+srv://admin:mandarina@clusterequifax.5bbmo.mongodb.net/equifax',
    mongoUser: '',
    mongoP: '',
    mongoAuthSource: 'admin',
    jwtSecretKey: "equifax"
}