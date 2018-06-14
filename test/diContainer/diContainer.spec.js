describe('diContainer', function () {
    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('Can create', function () {
        var target = new diContainer();
        expect(target).toBeDefined();
    });

    it('Can simple resolve', function () {
        var target = new diContainer();

        var config = new diRequestParameters();
        config.requirements.push('type1');
        let instance;
        config.onReady = (instancep) => {
            instance = instancep
        };
        var request = new diRequest(config);
        target.addRequest(request);
        target.registerInstance('type1', 'instance1')

        expect(instance).toEqual('instance1');
    });
});