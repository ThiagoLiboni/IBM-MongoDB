class templatesController {
    constructor(stringConnection) {
        this._dbConnectionTemplates = mongoose.createConnection(stringConnection)

        // this._dbConnectionTemplates.on("connected", () => {
        //     console.log("templates database is connected");
        // });
        this._dbConnectionTemplates.on("error", (err) => {
            console.error("Erro na conexão com o banco de dados:", err);
        });
    }
    
}