var show=require('./showtodo');
exports.editter=function(arg,res){var Mongoclient=require('mongodb').MongoClient;
    var id=0;
    var title=null;
    var description;
    var upquery1,upquery2;
    var ok=typeof(3);

    var checkid=function(){
            id=arg._id
            checker();    
        }

    var checker=function(){
            if(id!=0 && typeof(id)!=ok)
            {
                Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db)
                {
                    if(err) throw err;
                    var dbo=db.db("tododb");
                    ++id;
                    --id;
                    dbo.collection("tododb").find({'_id':id}).toArray(function(err,result){
                        if(err) throw err;
                        console.log(result);
                        if(result[0]==null)
                        {
                            console.log("Record for requested id does not exist!")
                            res.send("Record for requested id does not exist!");
                        }
                        else
                        {
                            title=arg.title;
                            description=arg.description;
                            edit();
                        }
                    });
                    db.close();
                });
            }
            else
            {   
                console.log("Please re-enter id: ")
                checkid();
            }
    }



    var edit=function(){Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if (err) throw err;
        var dbo=db.db("tododb");
        upquery1={ '_id': id}
        var date = new Date().toLocaleString();
        upquery2={$set:{ 'title' : title , 'description' : description , 'time' : date }};
        dbo.collection("tododb").updateOne(upquery1,upquery2,function(err,result){
            if (err) throw err;
            console.log("Record Updated\n");
            res.send("Record updated")
        });
        db.close();
    });
    };
    checkid();
};