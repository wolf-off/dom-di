describe('diRequest', function () {
    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('Can create', function () {
        var config = new diRequestParameters();
        config.requirements.push('test1');
        config.onReady = () => { };
        var target = new diRequest(config);
        expect(target).toBeDefined();
    });
});