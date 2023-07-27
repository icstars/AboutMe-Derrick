import mssql from 'mssql';
class Server {
    dbConfig = {
        host: 'localhost',
        user: 'sa',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: 1433
    };
    connection;
    constructor() {
        console.log('Server started.');
        this.testDB();
    }
    testDB() {
        let insertQuery = 'Insert into Characters (character_id, character_name, class_id) Values (?,?,?)';
        let data = [1, 'Admin2', 1];
        this.saveToDB(insertQuery, data);
    }
    saveToDB(insertQuery, data) {
        console.log("Establishing connection to DB.");
        console.log(`${this.dbConfig.host}/${this.dbConfig.port} ${this.dbConfig.user} ${this.dbConfig.password} ${this.dbConfig.database}`);
        this.connection = mssql.connect(this.dbConfig);
    }
}
const server = new Server();
//# sourceMappingURL=Server.js.map