
var node_env=process.env.DEPLOY_ENV;

console.log('ENV: '+process.env.NODE_ENV+' node: '+node_env)

if(!node_env){
    node_env='local'
}
console.log('Path config: '+'./config/'+node_env+'.env')

require('dotenv').config({
    path: './config/'+node_env+'.env'
})

module.exports = {
    database: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        databaseName: process.env.DB_NAME || 'nttv',
        port: process.env.DB_PORT || 3306,
        host: process.env.DB_HOST || 'localhost',
        type: process.env.DB_TYPE || 'mysql',
        limit: process.env.LIMIT || 1000,
    },
    token_generator: {
        secret_key: process.env.secret_key,
        expires_in: process.env.expires_in,
        credentialsRequired: (process.env.credentialsRequired||'true')=='false'?false:true
    },
    server: {
        port: process.env.PORT||3000,
        log: process.env.LOG,
    }

}