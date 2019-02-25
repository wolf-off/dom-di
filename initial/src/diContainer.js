var diContainerConfig = function () {
    this.lowlevel = false;
    this.parentContainer = null;
    this.childContainers = [];
}

var diRequestParameters = function () {
    this.requirements = [];
    this.onInstance = null;
    this.onReady = null;
    this.canCreateType = null;
}

var diRequest = function (inputParameters) {
    if (!inputParameters) {
        throw "diRequest have not parameters";
    }
    if (!this.canCreate &&
        (!inputParameters.requirements
            || !inputParameters.requirements.length
            || inputParameters.requirements.length < 1)) {
        throw "diRequest have not requirements";
    }
    if (inputParameters.onReady && typeof inputParameters.onReady != "function") {
        throw "onReady is not function";
    }
    if (inputParameters.onInstance && typeof inputParameters.onInstance != "function") {
        throw "onInstance is not function";
    }
    if (!inputParameters.onInstance && !inputParameters.onReady) {
        throw "diRequest have not any callback";
    }
    this.requirements = inputParameters.requirements;
    this.onInstance = inputParameters.onInstance;
    this.onReady = inputParameters.onReady;
    this.canCreateType = inputParameters.canCreateType;
}

var diContainer = function (inputConfig) {
    const config = inputConfig || new diContainerConfig();
    this.parentContainer = config.parentContainer;
    this.childContainers = config.childContainers || [];
    this.lowlevel = config.lowlevel;
    this.requests = [];
    this.instances = {};
}
diContainer.prototype.registerInstance = function (type, instance) {
    this.instances[type] = instance;
    this.requests.forEach(request => {
        if (request.requirements.some(req => req == type)) {
            if (request.onInstance) {
                request.onInstance(type, instance);
            }
        }
    });
    this.requests.forEach(request => {
        this.checkRequest(request);
    });
    this.childContainers.forEach(childContainer => {
        childContainer.registerInstance(type, instance);
    });
}
diContainer.prototype.addRequest = function (request) {
    this.requests.push(request);
    this.checkRequest(request);
}
diContainer.prototype.checkRequest = function (request) {
    const result = [];
    let isReady = true;
    request.requirements.forEach(req => {
        result.push(this.instances[req]);
        isReady = isReady && this.instances[req];
    });
    if (isReady) {
        var index = this.requests.indexOf(request);
        this.requests.splice(index, 1);
        if (request.onReady) {
            request.onReady(...result);
        }
    }
}

