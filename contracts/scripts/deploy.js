// Deploy script for ZoraSage contracts
const hre = require("hardhat");

async function main() {
  console.log("Deploying ZoraSage contracts...");

  // Get the contract factories
  const ZoraSageManager = await hre.ethers.getContractFactory("ZoraSageManager");
  
  // Deploy ZoraSageManager
  console.log("Deploying ZoraSageManager...");
  const zoraSageManager = await ZoraSageManager.deploy();
  await zoraSageManager.waitForDeployment();
  const zoraSageManagerAddress = await zoraSageManager.getAddress();
  console.log(`ZoraSageManager deployed to: ${zoraSageManagerAddress}`);
  
  // Deploy ZoraSageZoraIntegration with the ZoraSageManager address
  console.log("Deploying ZoraSageZoraIntegration...");
  const ZoraSageZoraIntegration = await hre.ethers.getContractFactory("ZoraSageZoraIntegration");
  const zoraSageZoraIntegration = await ZoraSageZoraIntegration.deploy(zoraSageManagerAddress);
  await zoraSageZoraIntegration.waitForDeployment();
  const zoraSageZoraIntegrationAddress = await zoraSageZoraIntegration.getAddress();
  console.log(`ZoraSageZoraIntegration deployed to: ${zoraSageZoraIntegrationAddress}`);
  
  console.log("Deployment complete!");
  console.log({
    zoraSageManager: zoraSageManagerAddress,
    zoraSageZoraIntegration: zoraSageZoraIntegrationAddress
  });
  
  // Wait for block confirmations to make verification easier
  console.log("Waiting for block confirmations...");
  await zoraSageManager.deploymentTransaction().wait(5);
  await zoraSageZoraIntegration.deploymentTransaction().wait(5);
  
  // Verify contracts if not on a local network
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contracts...");
    
    // Verify ZoraSageManager
    await hre.run("verify:verify", {
      address: zoraSageManagerAddress,
      constructorArguments: []
    });
    
    // Verify ZoraSageZoraIntegration
    await hre.run("verify:verify", {
      address: zoraSageZoraIntegrationAddress,
      constructorArguments: [zoraSageManagerAddress]
    });
    
    console.log("Verification complete!");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 