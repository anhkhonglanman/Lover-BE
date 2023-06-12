"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Provider_1 = require("../entity/Provider");
class ProviderService {
    constructor() {
        this.createProvider = async (provider) => {
            await this.providerRepository.save(provider);
        };
        this.providerRepository = data_source_1.AppDataSource.getRepository(Provider_1.Provider);
    }
}
exports.default = new ProviderService();
//# sourceMappingURL=ProviderService.js.map