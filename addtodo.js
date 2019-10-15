exports.adder=function(argument,res)
{   
    var Mongoclient=require('mongodb').MongoClient;
    var id1=0;
    var query;
    var title=argument.title;
    var description=argument.description;
    var date = new Date().toLocaleString();
    var query;
        Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if (err) throw err;
        var dbo=db.db("tododb");
        dbo.collection("tododb").find({},{"_id":1}).sort({"_id":-1}).limit(1).toArray(function(err, result1) {
            if (err) throw err;
            if(result1[0]==null)
            {
                ++id1;
                writedata();
            }
            else
            { 
                id1=result1[0]._id;
                ++id1;
                writedata();
            }
        });
        db.close();
    });
    var writedata=function(){Mongoclient.connect("mongodb://localhost:27017/tododb",function(err,db){
        if (err) throw err;
        var dbo=db.db("tododb");
        query={ '_id': id1, 'title' : title , 'description' : description , 'time' : date };
        dbo.collection("tododb").insertOne(query,function(err,result){
            if(err) throw err;
            console.log("Data written succesfully!!!\n");
            //res.send('<script>alert("Data written successfully!")</script>');
            //console.log("Written!!!");
            res.render('server', {
                name: 'Data written successfully!'
              });
        });
    db.close();
    })};
};


// Here's a smarter way of doing it -
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// var c,d;

// exports.addcust = function(arg)
// {
//   MongoClient.connect(url, function(err, db)

//   {

//     if (err) throw err;

//     var dbo = db.db("mydb");

//     dbo.collection("customers").find({}).toArray(function(err, result)
//     {

//        if (err) throw err;
//        //console.log(result);
//        hmm = (result[result.length-1]._id);
//        hmm++;

//        c = arg.name;
//        d = arg.address;
     
//        olol();

//     })

//     function olol()

//     {

//     var myobj = {_id: hmm, name: c , address: d, date : new Date().toLocaleString()};
//    // console.log(myobj)
//     dbo.collection("customers").insertOne(myobj, function(err, res)
//      {
//       if (err) throw err;
//       console.log("1 note inserted");
//      db.close();
//     })

//   }

//   })
// }
