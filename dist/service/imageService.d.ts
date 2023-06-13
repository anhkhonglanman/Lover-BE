declare class ImageService {
    private imageRepository;
    constructor();
    all: (id: any) => Promise<void>;
    save: (id: any, data: any) => Promise<void>;
    update: (id: any, data: any) => Promise<void>;
    delete: (idProvider: any) => Promise<void>;
}
declare const _default: ImageService;
export default _default;
