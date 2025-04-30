const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZoraSageManager", function () {
  let zoraSageManager;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy ZoraSageManager
    const ZoraSageManager = await ethers.getContractFactory("ZoraSageManager");
    zoraSageManager = await ZoraSageManager.deploy();
    await zoraSageManager.waitForDeployment();
  });

  describe("Strategy Management", function () {
    it("Should create a new strategy", async function () {
      const name = "Test Strategy";
      const description = "This is a test strategy";
      const parameters = JSON.stringify({
        riskLevel: "medium",
        targetCoins: ["0x1234", "0x5678"],
        tradingFrequency: "daily"
      });

      // Create a strategy
      const tx = await zoraSageManager.connect(user1).createStrategy(name, description, parameters);
      const receipt = await tx.wait();

      // Find the StrategyCreated event
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "StrategyCreated"
      );
      
      // Get the strategyId from the event
      const strategyId = event.args[1];

      // Get the strategy
      const strategy = await zoraSageManager.getStrategy(strategyId);

      // Validate the strategy values
      expect(strategy.name).to.equal(name);
      expect(strategy.description).to.equal(description);
      expect(strategy.owner).to.equal(user1.address);
      expect(strategy.isActive).to.be.true;
      expect(strategy.parameters).to.equal(parameters);
    });

    it("Should update an existing strategy", async function () {
      // Create a strategy
      const tx = await zoraSageManager.connect(user1).createStrategy(
        "Original Name",
        "Original Description",
        "{}"
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "StrategyCreated"
      );
      const strategyId = event.args[1];

      // Update the strategy
      const newName = "Updated Name";
      const newDescription = "Updated Description";
      const newParameters = JSON.stringify({ updated: true });
      
      await zoraSageManager.connect(user1).updateStrategy(
        strategyId,
        newName,
        newDescription,
        newParameters,
        true
      );

      // Get the updated strategy
      const strategy = await zoraSageManager.getStrategy(strategyId);

      // Validate the updated values
      expect(strategy.name).to.equal(newName);
      expect(strategy.description).to.equal(newDescription);
      expect(strategy.parameters).to.equal(newParameters);
    });

    it("Should not allow updating another user's strategy", async function () {
      // Create a strategy as user1
      const tx = await zoraSageManager.connect(user1).createStrategy(
        "User1 Strategy",
        "This belongs to user1",
        "{}"
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "StrategyCreated"
      );
      const strategyId = event.args[1];

      // Try to update the strategy as user2
      await expect(
        zoraSageManager.connect(user2).updateStrategy(
          strategyId,
          "Hacked Strategy",
          "This now belongs to user2",
          "{}",
          true
        )
      ).to.be.revertedWith("Not strategy owner");
    });

    it("Should delete a strategy", async function () {
      // Create a strategy
      const tx = await zoraSageManager.connect(user1).createStrategy(
        "Strategy to Delete",
        "This will be deleted",
        "{}"
      );
      const receipt = await tx.wait();
      const event = receipt.logs.find(
        (log) => log.fragment && log.fragment.name === "StrategyCreated"
      );
      const strategyId = event.args[1];

      // Delete the strategy
      await zoraSageManager.connect(user1).deleteStrategy(strategyId);

      // Get the strategy
      const strategy = await zoraSageManager.getStrategy(strategyId);

      // Check that it's marked as inactive
      expect(strategy.isActive).to.be.false;
    });
  });

  describe("Fund Management", function () {
    it("Should deposit funds", async function () {
      const depositAmount = ethers.parseEther("1.0");
      
      // Deposit funds
      await zoraSageManager.connect(user1).depositFunds({ value: depositAmount });

      // Check the balance
      const balance = await zoraSageManager.getUserFunds(user1.address);
      expect(balance).to.equal(depositAmount);
    });

    it("Should withdraw funds", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("0.5");
      
      // Deposit funds
      await zoraSageManager.connect(user1).depositFunds({ value: depositAmount });

      // Get balance before withdrawal
      const balanceBefore = await ethers.provider.getBalance(user1.address);
      
      // Withdraw funds
      const tx = await zoraSageManager.connect(user1).withdrawFunds(withdrawAmount);
      const receipt = await tx.wait();
      
      // Calculate gas used
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      // Get balance after withdrawal
      const balanceAfter = await ethers.provider.getBalance(user1.address);
      
      // Check that the balance increased by the withdrawal amount (minus gas)
      expect(balanceAfter - balanceBefore + gasUsed).to.equal(withdrawAmount);
      
      // Check the remaining balance in the contract
      const contractBalance = await zoraSageManager.getUserFunds(user1.address);
      expect(contractBalance).to.equal(depositAmount - withdrawAmount);
    });

    it("Should not allow withdrawing more than deposited", async function () {
      const depositAmount = ethers.parseEther("1.0");
      const withdrawAmount = ethers.parseEther("2.0");
      
      // Deposit funds
      await zoraSageManager.connect(user1).depositFunds({ value: depositAmount });

      // Try to withdraw more than deposited
      await expect(
        zoraSageManager.connect(user1).withdrawFunds(withdrawAmount)
      ).to.be.revertedWith("Insufficient funds");
    });
  });

  describe("Platform Fee", function () {
    it("Should allow owner to set the platform fee", async function () {
      const newFee = 100; // 1%
      
      // Set the platform fee
      await zoraSageManager.connect(owner).setPlatformFee(newFee);

      // Check the platform fee
      const fee = await zoraSageManager.getPlatformFee();
      expect(fee).to.equal(newFee);
    });

    it("Should not allow non-owner to set the platform fee", async function () {
      const newFee = 100; // 1%
      
      // Try to set the platform fee as non-owner
      await expect(
        zoraSageManager.connect(user1).setPlatformFee(newFee)
      ).to.be.revertedWithCustomError(zoraSageManager, "OwnableUnauthorizedAccount");
    });

    it("Should not allow setting a fee that's too high", async function () {
      const newFee = 1500; // 15%
      
      // Try to set a fee that's too high
      await expect(
        zoraSageManager.connect(owner).setPlatformFee(newFee)
      ).to.be.revertedWith("Fee too high");
    });
  });
}); 