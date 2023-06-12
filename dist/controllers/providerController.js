"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderService_1 = __importDefault(require("../service/ProviderService"));
class ProviderController {
    constructor() {
        this.save = async (req, res) => {
            try {
                let newProvider = await ProviderService_1.default.save(req.body);
                res.status(200).json({
                    success: true,
                    data: newProvider
                });
            }
            catch (e) {
                console.log('tạo người CCDV không thành công', e);
                res.status(400).json({
                    success: false,
                    message: 'tao provider ko thanh cong'
                });
            }
        };
        this.all = async (req, res) => {
            let allProvider = await ProviderService_1.default.all();
            res.status(200).json(allProvider);
        };
        this.searchByTypeProvider = async (req, res) => {
            let id = req.params.id;
            let typeProvider = await ProviderService_1.default.searchByType(id);
            res.status(200).json(typeProvider);
        };
    }
}
exports.default = new ProviderController();
//# sourceMappingURL=providerController.js.map