import { Request, Response } from "express";
declare class ProviderController {
    save: (req: Request, res: Response) => Promise<void>;
    all: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProviderController;
export default _default;
