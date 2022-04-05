const TESTToken = artifacts.require("TESTToken");

module.exports = function (deployer) {
  deployer.deploy(TESTToken, {overwrite: false});
};


