var Mongoclient=require("mongodb").MongoClient;
var id=0;
var disp;
exports.showdb=function(callback,res){
    
    Mongoclient.connect("mongodb://todouser:doto1323@mongodb_server:27017/tododb",(err,db)=>{
        if(err) throw err;
        var dbo=db.db("tododb");
        console.log("Displaying!\n");
        dbo.collection("tododb").find({}).toArray((err,result)=>{
                if(err) throw err;
                disp=result;
                res.send(disp);
            });
        db.close(); 
    });
    //callback(null,disp); 
};
