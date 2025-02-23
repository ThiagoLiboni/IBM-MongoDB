class templatesController {
    constructor() {
        this._dbConnectionTemplates = mongoose.createConnection(Connections.TEMPLATES)
        this._dbConnectionTemplates.on("connected", () => {
            console.log("Connected to the Templates database");
        });
    }
    
}