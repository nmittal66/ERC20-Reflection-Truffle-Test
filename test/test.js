const TESTToken = artifacts.require('TESTToken');
const { assert } = require('chai');

contract('Dog-Park-Token', (accounts) => {
    let TESTTokenInstance;
    let owner = accounts[0];
    before(async () =>{        
       TESTTokenInstance = await TESTToken.at('Contract Address');
       
    });

    it('Get Total Supply', async () => {
        let totSupply = 1000000000 * 10**18;
        let totalSupply = await TESTTokenInstance.totalSupply.call();
        assert.equal(totalSupply.toString(), totSupply, 'total supply is wrong');
        console.log(accounts);
        console.log("Total Supply :- " + totalSupply);
    });

    it('Token Name', async () => {
        let name = await TESTTokenInstance.name();
        assert.equal(name, 'TESTCOIN');
        console.log("Token Name :- " + name);

    });

    it('Get BalanceOf', async () => {
        let balance = await TESTTokenInstance.balanceOf.call(accounts[4]);
        console.log("Get Balance Of :- " + balance);
    });

    it('Tokenomics Wallets Addresse balance', async () => {
        let balanceOfReward = await TESTTokenInstance.balanceOf.call(accounts[1]);
        let balanceOfICO = await TESTTokenInstance.balanceOf.call(accounts[2]);
        let balanceOfRewardAward = await TESTTokenInstance.balanceOf.call(accounts[3]);
        let balanceOfCreator = await TESTTokenInstance.balanceOf.call(accounts[4]);
        console.log("Balance Of Reward Wallet :- " + balanceOfReward);
        console.log("Balance Of ICO Wallet :- " + balanceOfICO);
        console.log("Balance Of Reward Award Wallet :- " + balanceOfRewardAward);
        console.log("Balance Of Creator Wallet :- " + balanceOfCreator);
    });

    it('Transfer', async () => {
        assert.notEqual(accounts[0], '0x0', 'address to can not be zero address');
        assert.notEqual(accounts[3], '0x0', 'address from can not be zero address');
        try {
            await TESTTokenInstance.transfer(accounts[3], 1000, { from: accounts[0] });
        } catch (error) {
        err = error
            console.log(error);
        }
    });

    it("Token TransferFrom, should give accounts[1] authority to spend account[0]'s token", async () => {
         return await TESTTokenInstance.approve(accounts[1], 2000).then(async () =>{
        }).then(async () =>{
         return await TESTTokenInstance.allowance.call(accounts[0], accounts[1]);
         //assert.equal(result.toString(), owner)
        }).then(async () =>{
         //assert.equal(result.toNumber(), 2000, 'allowance is wrong');
         return await TESTTokenInstance.transferFrom(accounts[0], accounts[2], 2000, {from: accounts[1]});
        }).then(async () =>{
         return await TESTTokenInstance.balanceOf.call(accounts[0]);
        }).then(async () =>{
         //assert.equal(result.toNumber(), 3000, 'accounts[0] balance is wrong');
         return await TESTTokenInstance.balanceOf.call(accounts[1]);
        }).then(async () =>{
         //assert.equal(result.toNumber(), 5000, 'accounts[1] balance is wrong');
         return await TESTTokenInstance.balanceOf.call(accounts[2]);
        })
       
      });

    it('approve', async () => {
        await TESTTokenInstance.approve(accounts[1], 1000);
    });

    it('increaseAllowance', async () => {
        assert.notEqual(accounts[5], '0x0', 'spender address can not be zero address');
        await TESTTokenInstance.increaseAllowance(accounts[5], 1000);
    });

    it('decreaseAllowance', async () => {
        assert.notEqual(accounts[5], '0x0', 'spender address can not be zero address');
        await TESTTokenInstance.decreaseAllowance(accounts[5], 100);
    });

    it('excludeFromFee', async () => {
        assert.equal(accounts[0], owner, 'Only owner can access this function.');
        await TESTTokenInstance.excludeFromFee(accounts[0]);
    });

    it('includeInFee', async () => {
        assert.equal(accounts[7], owner, 'Only owner can access this function.');
        await TESTTokenInstance.includeInFee(accounts[7]);
    });

});