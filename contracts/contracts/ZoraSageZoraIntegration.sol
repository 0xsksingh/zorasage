// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ZoraSageZoraIntegration
 * @dev Contract to interact with Zora coins, facilitating AI-driven trading strategies
 * @author ZoraSage Team
 */
contract ZoraSageZoraIntegration is Ownable, ReentrancyGuard {
    // ============ Events ============
    event CoinTraded(address indexed trader, address indexed coinContract, uint256 amount, bool isBuy);
    event ReferralEarned(address indexed trader, address indexed coinContract, uint256 amount);
    event StrategyExecuted(address indexed user, uint256 strategyId, address indexed coinContract, uint256 amount, bool isBuy);
    
    // ============ State Variables ============
    // Address of the ZoraSageManager contract
    address public zoraSageManager;
    
    // Map of approved Zora coin addresses
    mapping(address => bool) public approvedCoins;
    
    // Map of user permissions for automatic trading
    mapping(address => bool) public autoTradingEnabled;
    
    // Trading analytics for each user
    mapping(address => mapping(address => uint256)) public userBuyVolume;
    mapping(address => mapping(address => uint256)) public userSellVolume;
    
    // Platform statistics
    uint256 public totalTradeVolume;
    uint256 public totalReferralEarned;
    
    // ============ Constructor ============
    constructor(address _zoraSageManager) Ownable(msg.sender) {
        zoraSageManager = _zoraSageManager;
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Trade a Zora coin
     * @param coinContract Address of the Zora coin contract
     * @param amount Amount to trade
     * @param isBuy True for buy, false for sell
     */
    function tradeCoin(
        address coinContract, 
        uint256 amount, 
        bool isBuy
    ) external nonReentrant {
        require(approvedCoins[coinContract], "Coin not approved");
        require(amount > 0, "Amount must be greater than 0");
        
        // Record trade
        if (isBuy) {
            userBuyVolume[msg.sender][coinContract] += amount;
        } else {
            userSellVolume[msg.sender][coinContract] += amount;
            
            // For sells, transfer the coins from the user to this contract
            IERC20(coinContract).transferFrom(msg.sender, address(this), amount);
        }
        
        totalTradeVolume += amount;
        
        emit CoinTraded(msg.sender, coinContract, amount, isBuy);
    }
    
    /**
     * @notice Execute a trading strategy
     * @param strategyId ID of the strategy to execute
     * @param coinContract Address of the Zora coin contract
     * @param amount Amount to trade
     * @param isBuy True for buy, false for sell
     */
    function executeStrategy(
        uint256 strategyId,
        address coinContract,
        uint256 amount,
        bool isBuy
    ) external nonReentrant {
        require(approvedCoins[coinContract], "Coin not approved");
        require(amount > 0, "Amount must be greater than 0");
        
        // Here we would validate the strategy exists and belongs to the user
        // This would typically involve interaction with the ZoraSageManager contract
        
        // Record trade
        if (isBuy) {
            userBuyVolume[msg.sender][coinContract] += amount;
        } else {
            userSellVolume[msg.sender][coinContract] += amount;
            
            // For sells, transfer the coins from the user to this contract
            IERC20(coinContract).transferFrom(msg.sender, address(this), amount);
        }
        
        totalTradeVolume += amount;
        
        emit StrategyExecuted(msg.sender, strategyId, coinContract, amount, isBuy);
    }
    
    /**
     * @notice Record referral earnings
     * @param trader Address of the trader
     * @param coinContract Address of the Zora coin contract
     * @param amount Amount of referral earned
     */
    function recordReferralEarning(
        address trader,
        address coinContract,
        uint256 amount
    ) external onlyOwner {
        totalReferralEarned += amount;
        emit ReferralEarned(trader, coinContract, amount);
    }
    
    /**
     * @notice Enable or disable automatic trading
     * @param enabled Whether automatic trading is enabled
     */
    function setAutoTradingEnabled(bool enabled) external {
        autoTradingEnabled[msg.sender] = enabled;
    }
    
    /**
     * @notice Approve a Zora coin for trading
     * @param coinContract Address of the coin contract
     * @param approved Whether the coin is approved
     */
    function setApprovedCoin(address coinContract, bool approved) external onlyOwner {
        approvedCoins[coinContract] = approved;
    }
    
    /**
     * @notice Set the ZoraSageManager address
     * @param _zoraSageManager Address of the ZoraSageManager contract
     */
    function setZoraSageManager(address _zoraSageManager) external onlyOwner {
        zoraSageManager = _zoraSageManager;
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get user's trading volume for a specific coin
     * @param user Address of the user
     * @param coinContract Address of the coin contract
     * @return buyVolume, sellVolume
     */
    function getUserTradingVolume(address user, address coinContract) 
        external 
        view 
        returns (uint256 buyVolume, uint256 sellVolume) 
    {
        buyVolume = userBuyVolume[user][coinContract];
        sellVolume = userSellVolume[user][coinContract];
    }
    
    /**
     * @notice Check if automatic trading is enabled for a user
     * @param user Address of the user
     * @return Whether automatic trading is enabled
     */
    function isAutoTradingEnabled(address user) external view returns (bool) {
        return autoTradingEnabled[user];
    }
    
    /**
     * @notice Check if a coin is approved for trading
     * @param coinContract Address of the coin contract
     * @return Whether the coin is approved
     */
    function isCoinApproved(address coinContract) external view returns (bool) {
        return approvedCoins[coinContract];
    }
} 