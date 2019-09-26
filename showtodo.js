var Mongoclient=require("mongodb").MongoClient;
var id=0;
var disp;
exports.showdb=function(callback){
    
    Mongoclient.connect("mongodb://localhost:27017/tododb",(err,db)=>{
        if(err) throw err;
        var dbo=db.db("tododb");
        console.log("Displaying!\n");
        dbo.collection("tododb").find({}).toArray((err,result)=>{
                if(err) throw err;
                disp=result;
            });
        db.close(); 
    });
    callback(null,disp); 
};
