const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying contracts...");

  // Deploy BTCVault (using deployer as bridge for now)
  const [deployer] = await ethers.getSigners();
  console.log("Deploying BTCVault with address:", deployer.address);

  const BTCVault = await hre.ethers.getContractFactory("BTCVault");
  const btcVault = await BTCVault.deploy(deployer.address);
  await btcVault.deployed();
  console.log("BTCVault deployed to:", btcVault.address);

  // Deploy SocialProfile
  console.log("Deploying SocialProfile...");
  const SocialProfile = await hre.ethers.getContractFactory("SocialProfile");
  const socialProfile = await SocialProfile.deploy();
  await socialProfile.deployed();
  console.log("SocialProfile deployed to:", socialProfile.address);

  // Deploy PrivacyContract
  console.log("Deploying PrivacyContract...");
  const PrivacyContract = await hre.ethers.getContractFactory("PrivacyContract");
  const privacyContract = await PrivacyContract.deploy();
  await privacyContract.deployed();
  console.log("PrivacyContract deployed to:", privacyContract.address);

  // Save addresses for frontend
  const addresses = {
    BTCVault: btcVault.address,
    SocialProfile: socialProfile.address,
    PrivacyContract: privacyContract.address,
    Bridge: deployer.address, // For now, using deployer as bridge
    network: hre.network.name
  };

  fs.writeFileSync(
    "../frontend/constants/contracts.json",
    JSON.stringify(addresses, null, 2)
  );

  console.log("Contract addresses saved to frontend/constants/contracts.json");
  console.log("Addresses:", addresses);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 