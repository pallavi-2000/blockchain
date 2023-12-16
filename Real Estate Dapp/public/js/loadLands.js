

$('#updateLandsButtonID').click(function()
{
    loadLand();
    return false;
});


$(document).arrive('input[type=radio][name=inlineRadioOptions]', function() {

    $('input[type=radio][name=inlineRadioOptions]').on('change', function ()
    {
        var uniqueId = $(this).val();
        updateStatus("\nLand ID selected: " + uniqueId);
        $('#selectedLandID').text(uniqueId); 
    });
});




function loadLand()
{
    if (isOkToCall)    
    {
        
        $('#contentPanel').empty();

        
        realEstateContractHook.getNoOfLands.call(ethWeb3.eth.defaultAccount,
            (error, noOfLandsOfCurrentAccount) =>
            {
               
                for (index=0; index<noOfLandsOfCurrentAccount;index++)
                {
                    realEstateContractHook.getLand.call(ethWeb3.eth.defaultAccount, index, 
                        (error, land) =>
                        {
                            if (land[3] != 0)
                            {
                                console.log("Land ID: " + land[3] + ":");
                                console.log("Location: " + land[0]);
                                console.log("Cost: " + land[1]);
                                console.log("Owner: " + land[2]);  
                                updateListDisplay(land);  
                             
                            }
                        }
                    );
                }
                   
            }
        );        

    }    
    else
    {
        console.log("web3 init not ok.");
    }
}


function updateListDisplay(land)
{
    var i = land[3];
    var place = land[0];
    var price = land[i];
    var myCard = $('</h5><span>Place: '+ place +'</span><span>Price: '+ price +'</span></div>');
    myInput.appendTo(myLabel);
    myCard.appendTo(myLabel);
    $('<br>').appendTo(myLabel);
    myLabel.appendTo('#contentPanel');
}