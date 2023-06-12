import { Request, Response } from "express";
declare class ProviderController {
    save: (req: Request, res: Response) => Promise<void>;
    all: (req: Request, res: Response) => Promise<void>;
    showOne: (req: Request, res: Response) => Promise<void>;
    searchByTypeProvider: (req: Request, res: Response) => Promise<void>;
    editProvider: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProviderController;
export default _default;
