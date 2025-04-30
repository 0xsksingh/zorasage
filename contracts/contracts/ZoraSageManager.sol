// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ZoraSageManager
 * @dev Contract to manage AI-powered trading strategies and analytics for Zora coins
 * @author ZoraSage Team
 */
contract ZoraSageManager is Ownable, ReentrancyGuard {
    // ============ Events ============
    event StrategyCreated(address indexed user, uint256 strategyId, string name);
    event StrategyUpdated(address indexed user, uint256 strategyId);
    event StrategyDeleted(address indexed user, uint256 strategyId);
    event FundsDeposited(address indexed user, uint256 amount);
    event FundsWithdrawn(address indexed user, uint256 amount);

    // ============ Structs ============
    struct Strategy {
        string name;
        string description;
        address owner;
        bool isActive;
        uint256 createdAt;
        uint256 updatedAt;
        // Parameters for the strategy (stored as JSON string)
        string parameters;
    }

    // ============ State Variables ============
    mapping(address => uint256[]) private userStrategies;
    mapping(uint256 => Strategy) private strategies;
    mapping(address => uint256) private userFunds;
    
    uint256 private nextStrategyId = 1;
    uint256 private platformFee = 50; // 0.5% fee (in basis points)

    // ============ Constructor ============
    constructor() Ownable(msg.sender) {}

    // ============ External Functions ============
    
    /**
     * @notice Create a new trading strategy
     * @param name Name of the strategy
     * @param description Description of the strategy
     * @param parameters Strategy parameters (JSON string)
     * @return strategyId ID of the created strategy
     */
    function createStrategy(
        string calldata name,
        string calldata description,
        string calldata parameters
    ) external returns (uint256 strategyId) {
        strategyId = nextStrategyId++;
        
        Strategy memory newStrategy = Strategy({
            name: name,
            description: description,
            owner: msg.sender,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            parameters: parameters
        });
        
        strategies[strategyId] = newStrategy;
        userStrategies[msg.sender].push(strategyId);
        
        emit StrategyCreated(msg.sender, strategyId, name);
        return strategyId;
    }
    
    /**
     * @notice Update an existing strategy
     * @param strategyId ID of the strategy to update
     * @param name New name of the strategy
     * @param description New description of the strategy
     * @param parameters New strategy parameters
     * @param isActive Whether the strategy is active
     */
    function updateStrategy(
        uint256 strategyId,
        string calldata name,
        string calldata description,
        string calldata parameters,
        bool isActive
    ) external {
        Strategy storage strategy = strategies[strategyId];
        require(strategy.owner == msg.sender, "Not strategy owner");
        
        strategy.name = name;
        strategy.description = description;
        strategy.parameters = parameters;
        strategy.isActive = isActive;
        strategy.updatedAt = block.timestamp;
        
        emit StrategyUpdated(msg.sender, strategyId);
    }
    
    /**
     * @notice Delete a strategy
     * @param strategyId ID of the strategy to delete
     */
    function deleteStrategy(uint256 strategyId) external {
        Strategy storage strategy = strategies[strategyId];
        require(strategy.owner == msg.sender, "Not strategy owner");
        
        strategy.isActive = false;
        emit StrategyDeleted(msg.sender, strategyId);
    }
    
    /**
     * @notice Deposit funds to use with strategies
     */
    function depositFunds() external payable nonReentrant {
        require(msg.value > 0, "Must deposit some ETH");
        userFunds[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    /**
     * @notice Withdraw funds
     * @param amount Amount to withdraw
     */
    function withdrawFunds(uint256 amount) external nonReentrant {
        require(userFunds[msg.sender] >= amount, "Insufficient funds");
        userFunds[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    /**
     * @notice Set the platform fee
     * @param newFee New fee in basis points (e.g., 50 = 0.5%)
     */
    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
    
    // ============ View Functions ============
    
    /**
     * @notice Get all strategies for a user
     * @param user Address of the user
     * @return Array of strategy IDs
     */
    function getUserStrategies(address user) external view returns (uint256[] memory) {
        return userStrategies[user];
    }
    
    /**
     * @notice Get strategy details
     * @param strategyId ID of the strategy
     * @return Strategy details
     */
    function getStrategy(uint256 strategyId) external view returns (Strategy memory) {
        return strategies[strategyId];
    }
    
    /**
     * @notice Get user's fund balance
     * @param user Address of the user
     * @return User's fund balance
     */
    function getUserFunds(address user) external view returns (uint256) {
        return userFunds[user];
    }
    
    /**
     * @notice Get the current platform fee
     * @return Fee in basis points
     */
    function getPlatformFee() external view returns (uint256) {
        return platformFee;
    }
} 