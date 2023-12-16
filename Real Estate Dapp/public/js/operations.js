
$('#addLandButtonID').click(function()
{
    addLand();
    return false;
});

function addLand()
{
    if (isOkToCall)  
    {
        var place = $('#newLocationID').val();
        var price = $('#newCostID').val();
        $('#loaderID2').show();
        realEstateContractHook.addLand(place, cost,
            (error) =>
            {
                if (error)
                {
                    updateStatus("\nAdd Land failed. Error: " + error);
                    $('#loaderID2').hide(); 
                }                
            }
        );
        updateStatus("\nAdd Land called. Please wait.");
    }
    else
    {
        updateStatus("\nweb3 init not ok.");
        
    }
}


$('#transferLandButtonID').click(function()
{
    transferLand();
    return false;
});

function transferLand()
{
    if (isOkToCall)   
    {
        var buyer = $('#buyerAccountID').val();
        var landID = $('#selectedLandID').text();
        if (landID != 0)
        {
            $('#loaderID2').show(); 
            realEstateContractHook.transferLand(buyer, landID,
                (error) =>
                {
                    if (error)
                    {
                        updateStatus("\nTransfer Land failed. Error: " + error);
                        $('#loaderID2').hide(); 
                    }                
                }
            );
            updateStatus("\nTransfer Land called. Please wait.");
            
        }
        else
        {
            updateStatus('\nERROR: Please select a land first');
        }

    }
    else
    {
        console.log("web3 init not ok.");
    }
}