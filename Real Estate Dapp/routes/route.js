//call back function to be called when '/' route is called
exports.home = function(request,response)
{
   
    response.render("main_1",
        {
            
            title:"page 1"
        }
    );
}

