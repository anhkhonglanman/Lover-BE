declare class ProviderService {
    private providerRepository;
    constructor();
    save: (provider: any) => Promise<void>;
    all: () => Promise<any>;
    searchByType: (id: any) => Promise<any>;
}
declare const _default: ProviderService;
export default _default;
