declare class ProviderService {
    private providerRepository;
    constructor();
    save: (provider: any) => Promise<void>;
    all: () => Promise<any>;
    one: (id: any) => Promise<any>;
    searchByType: (id: any) => Promise<any>;
    update: (id: any, update: any) => Promise<void>;
    findAll(q: any): Promise<any>;
}
declare const _default: ProviderService;
export default _default;
