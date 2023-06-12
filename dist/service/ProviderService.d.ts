declare class ProviderService {
    private providerRepository;
    constructor();
    createProvider: (provider: any) => Promise<void>;
}
declare const _default: ProviderService;
export default _default;
