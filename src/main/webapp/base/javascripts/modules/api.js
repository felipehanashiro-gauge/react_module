var request = require("./request");


var req = {
    post: function(url, data, success, error){
        request({
            data: (data ? req.dataToString(data) : ""),
            method: "POST",
            url: url,
            success: function(resp){
                if(success) {
                    success(req.dataToJSON(resp));
                }
            },
            error: function(err){
                if(error){
                    error(err);
                }
            }
        });
    },
    dataToJSON: function(data){
        if(data && typeof data === "string"){
            return JSON.parse(data);
        }return data;
    },
    dataToString: function(data){
        if(typeof data === "object"){
            return JSON.stringify(data);
        }return data;
    }
}


var Api = (function(){
    return {
        _get: function(url, success, error){
            $.ajax({
                type: "GET",
                url: url,
                success: function(resp){
                    if(success) {
                        try {
                            success(req.dataToJSON(resp));
                        }catch(e){
                            success(resp);
                        }
                    }
                },
                error: function(err){
                    if(err){
                        error(err);
                    }
                }
            });
        },
        _post: function(url, data, success, error){
            $.ajax({
                type: "POST",
                url: url,
                contentType: 'application/json',
                data: (data ? req.dataToString(data) : ""),
                success: function(resp){
                    if(success) {
                        try {
                            success(req.dataToJSON(resp));
                        }catch(e){
                            success(resp);
                        }
                    }
                },
                error: function(err){
                    if(error){
                        error(err);
                    }
                }
            });
        },
        FOS: (function(){
            return {
                fleetOperational: function(data,success, error){
                    req.post("fleet-operational", data, success, error);
                }
            }
        })(),
        Operator: (function(){
            return{
                favoriteOperator: function(success, error){
                    req.post("favorite-operator", "", success, error);
                },
                list: function(success, error){
                    req.post("operators", "", success, error);
                }
            }
        })(),
        Supplier: (function(){
            return{
                favoriteSupplier: function(success, error){
                    req.post("favorite-supplier", "", success, error);
                },
                list: function(success, error){
                    req.post("suppliers", "", success, error);
                }
            }
        })()
    }
})();

module.exports = Api;
