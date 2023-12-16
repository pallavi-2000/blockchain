// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.0 <0.9.0;


contract landOwnership
{
    struct Land 
    {
        address landOwner;
        string place;
        uint price;
        uint uniqueId;
    }
    address public owner;   

    uint public landCounter;
    
    //define who is owner
    constructor() public
    {
        owner = msg.sender;
        landCounter = 0;
    }
    
    
    event add(address _owner, uint _uniqueId);
    event transfer(address indexed _from, address indexed _to, uint _uniqueId);
    
    modifier isOwner
    {
        require(msg.sender == owner);
        _;
    }
    
    
    mapping (address => Land[]) public __ownedLands; 
    

   
    function addLand(string memory _place, uint _price) public isOwner
    {
        landCounter = landCounter + 1;
        Land memory myLand = Land(
            {
                landOwner: msg.sender,
                place: _place,
                price: _price,
                uniqueId: landCounter
            });
        __ownedLands[msg.sender].push(myLand);
        emit add(msg.sender, landCounter);

    }
    
    
    
    function transferLand(address _landBuyer, uint _uniqueId) public returns (bool)
    {
        
        for(uint i=0; i < (__ownedLands[msg.sender].length);i++)    
        {
            if (__ownedLands[msg.sender][i].uniqueId == _uniqueId)
            {
                Land memory myLand = Land(
                    {
                        landOwner :_landBuyer,
                        place: __ownedLands[msg.sender][i].place,
                        price: __ownedLands[msg.sender][i].price,
                        uniqueId: _uniqueId
                    });
                __ownedLands[_landBuyer].push(myLand);   
                
                
                delete __ownedLands[msg.sender][i];

                
               
                emit transfer(msg.sender, _landBuyer, _uniqueId);                
                
                return true;
            }
        }
        
       
        return false;
    }
    
    
    function getLand(address _landHolder, uint _index) public view returns (string memory, uint, address,uint)
    {
        return (__ownedLands[_landHolder][_index].place, 
                __ownedLands[_landHolder][_index].price,
                __ownedLands[_landHolder][_index].landOwner,
                __ownedLands[_landHolder][_index].uniqueId);
                
    }
    
    
    function getNoOfLands(address _landHolder) public view returns (uint)
    {
        return __ownedLands[_landHolder].length;
    }

}