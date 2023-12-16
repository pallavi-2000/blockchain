
function updateStatus(message) {
    $('#statusID').append(message);
    $('#statusID').scrollTop($('#statusID')[0].scrollHeight);
}

var isOkToCall = false;
var ethWeb3;

var realEstateContract;
var realEstateContractHook;
var realEstateContractEvent;


if (typeof web3 !== 'undefined') {
    const web3 = window.web3.currentProvider;
    ethWeb3 = web3;
    var message = $('<li><h5>Metamask detected</h5></li>');
    $('#initialStatusID').append(message);
    $('#initID').hide();
    $('#main').show();
    console.log("Metamask detected");
    updateStatus("\nMetamask detected successfully");

    async function onInit() {
        await window.ethereum.enable();
        var accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var account = accounts[0];
        console.log(account)
        $('#currentAcntDisplayID').text(accounts[0]);
        updateStatus("\nMetaMask Selected Account: " + accounts);


   
        realEstateContract = new web3.eth.contract(contractABI);
        realEstateContractHook = realEstateContract.at(contractAddress);

        realEstateContractAddEvent = realEstateContractHook.Add({}, 'latest');
        realEstateContractTransferEvent = realEstateContractHook.Transfer({}, 'latest');
        updateStatus("\nRegistered for events from Contract");
        realEstateContractAddEvent.watch(
            function (error, result) {
                if (!error) {
                    updateStatus("\nAdd Event: Owner: " + result.args._owner + " Unique Id: " + result.args._uniqueId);
                    $('#loaderID2').hide();
                } else {
                    updateStatus("\nAdd Event Error: " + error);
                }
            }
        );
        realEstateContractTransferEvent.watch(
            function (error, result) {
                if (!error) {
                    updateStatus("\nTransfer Event: From: " + result.args._from + " , To: " + result.args._to + " , landID: " + result.args._LandId);
                    $('#loaderID2').hide();
                } else {
                    updateStatus("\nTransfer Event Error: " + error);
                }
            }
        );




        
        var accountInterval = setInterval(function () {      
            if (accounts[0] !== account) {
                account = web3.eth.accounts[0];
                updateStatus("\nCurrent Account: " + account);
                $('#currentAcntDisplayID').text(account);
            }
        }, 1000);
        updateStatus("\nRegistered for Selected Account Changes in Metamask");


        isOkToCall = true;
    }
    onInit();
}



         
else {
    var message = $('<li><h5>Metamask Not available. Install and Try again</h5></li>');
    $('#initialStatusID').append(message);
    console.log("Metamask not detected");
}

    
   