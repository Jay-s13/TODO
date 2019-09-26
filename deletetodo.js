var show=require('./showtodo');
exports.deleterec=function(arg,res){
    var Mongoclient=require('mongodb').MongoClient;
    var delid=0;
    var run;
    var query;

    var checker=function(){
        if(delid!=0 && Number.isInteger(delid))
        {
            Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db)
            {
                if(err) throw err;
                var dbo=db.db("tododb");
                ++delid;
                --delid;
                dbo.collection("tododb").find({'_id':delid}).toArray(function(err,result){
                    if(err) throw err;
                    if(result[0]==null)
                    {
                        console.log("Record for requested id does not exist!")
                        res.send("Record for requested id does not exist!");
                    }
                    else
                    {
                        del();
                    }
                });
                db.close();
            });
        }
        else
        {   
            console.log("Please re-enter id!!!")
            res.send("Please re-enter id!!!");
        }
}
var x=function(){
    delid=arg._id;
    ++delid;
    --delid;
    console.log(delid);
    checker(); 
};
    var del=function(){Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if(err) throw err;
        var dbo=db.db("tododb");
        ++delid;
        --delid;
        var myquery={ '_id': delid };
        dbo.collection("tododb").deleteOne(myquery,function(err,result){
            if (err) throw err;
            console.log("Deleted\n");
            res.send("Deleted!!!");
            updater();
        });
        db.close();
        });
    };

    var funx=function(){
        Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if(err) throw err;
        var dbo=db.db("tododb");
        var temp=delid;
        delid++;
        dbo.collection("tododb").find({"_id":delid}).toArray(function(err, result2) {
            if (err) throw err;
            if(result2[0]!=null)
            {
                var title1=result2[0].title;
                var desc1=result2[0].description;
                var time1=result2[0].time;
                query={ '_id': temp, 'title' : title1 , 'description' : desc1 , 'time' : time1 };
                funx2();
            }
            else
            {
                return;
            }
        });
        db.close();
    })};
    var funx2=function(){
        Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if(err) throw err;
        var dbo=db.db("tododb");
        dbo.collection("tododb").deleteOne({'_id':delid},function(err,result4){
            if (err) throw err;
            funx3();
        });
        db.close();
    })};
    var funx3=function(){
        Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if(err) throw err;
        var dbo=db.db("tododb");
        dbo.collection("tododb").insertOne(query,function(err,result3){
            if (err) throw err;    
            --run;
            if(run!=0)
            {
                funx();
            }
            else
            {
                return;
            }
        });
        db.close();
    })};
    var updater=function(){Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if(err) throw err;
        var idlast=0;
        var dbo=db.db("tododb");
        dbo.collection("tododb").find({},{"_id":1}).sort({"_id":-1}).limit(1).toArray(function(err, result1) {
            if (err) throw err;
            if(result1[0]!=null)
            {
                idlast=result1[0]._id;
                run=idlast-delid;
                ++run;
                --run;
                if(run!=0)
                funx();
            }
            else
            {
                result1[0]=null;
                return;
            }
        });
        db.close();
    });
}
x();
};