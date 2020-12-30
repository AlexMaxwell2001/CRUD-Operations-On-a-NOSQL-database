const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = "mongodb+srv://mainUser:mainUserPP@cluster0-npb0d.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db)
{
  if (err) throw err;
  var db = db.db("mydb");

  /*Created a collection name "Customers" to hold the customer's details and embedded addresses*/
  db.createCollection("Customers", function(err)
  {
    if (err) throw err;
  });

  /*Created a collection named Items to hold the 
  information about the items which can be bought*/
  db.createCollection("Items", function(err)
  {
    if (err) throw err;
  });

  /*Created a collection named Orders to hold all the 
  information about the customer orders*/
  db.createCollection("Orders", function(err)
  {
    if (err) throw err;
  });


  //This is to print out the contents of the Customers collections at anytime
  const showCustomer = function(db)
  {
      const collection1 = db.collection('Customers');
      collection1.find({}).toArray(function(err, docs) 
      {
        console.log(docs);
      });
  }
  //This is to print out the contents of the Items collections at anytime
  const showItems = function(db)
  {
    const collection2 = db.collection('Items');
    collection2.find({}).toArray(function(err, docs) 
    {
      console.log(docs);
    });
  }
  //This is to print out the contents of the Orders collections at anytime
  const showOrders = function(db)
  {
    const collection3 = db.collection('Orders');
    collection3.find({}).toArray(function(err, docs) 
    {
      console.log(docs);
    });
  }

  //comment this to not see the contents of the Customers collection 
  showCustomer(db,function()
  {
    MongoClient.close();
  })

  /*Uncomment this to see the contents of the Items collection 
  showItems(db,function()
  {
    MongoClient.close();
  });*/

  /*Uncomment this to see the contents of the Orders collection 
  showOrders(db,function()
  {
    MongoClient.close();
  });*/


  /*This method controls the C of the CRUD 
  activities and demonstrates how to create
  a new customer detail ,address ,item and 
  orders document*/
  const createForAllcollections = function(db, callback) 
  {
    //This creates a new customer to the customer collection containing the person's details and address
    const collection1 = db.collection('Customers');
    collection1.insertOne(
    {"_id" : "5e9eb57f1c9d441254bb94d3","Title" : "Mrs." ,"FirstNames":"Alexandra","Surname":"Douglas","Mobile":"0880937004","Email":"alexandraDouglas@gmail.com","AddressHome":{
    "AddressLine1" :"Cherry Road",
    "AddressLine2" : "The Big Hill",
    "Town" : "Salthill",
    "cityOrcounty":"Co. Galway",
    "EIRCODE":"G65 J903"
    },
    "AddressBilling":{
    "AddressLine1" :"Apple Road",
    "AddressLine2" : "The Small Hill",
    "Town" : "Connemara",
    "cityOrcounty":"Co. Galway",
    "EIRCODE":"G65 J903"
    }
    });

    //This creates a new item and adds it to the Items collection
    const collection2 = db.collection('Items');
    collection2.insertOne(
      {"Manufacturer" : "Nokia" ,"Model":"Talkman 320F","Price":"1999.99"}
    );

    //This creates a new Order and adds it to the Orders collection
    const collection3 = db.collection('Orders');
    collection3.insertOne(
      {"cust_id":"5e9eb57f1c9d441254bb94d3","itemsPurchased":"iPhone 11 pro, Talkman 320F"}
    );
  }

  /*Uncomment to insert data/C of CRUD
  createForAllcollections(db, function() 
  {
    MongoClient.close();
  });*/ 



  /*This function controls the R of the CRUD 
  activities and demonstrates how to Retrieve
  a random customer ,item and 
  order document*/
  const retrieveDocumentsFromAllCollections = function(db)
  {
      //retrieving a random Customer's details and address
      const collection1 = db.collection('Customers');
      //First find all the documents in Customers
      collection1.find({}).toArray(function(err, docs) 
      {
          //Then generate a random index in Customers collection
          var randomUser =  Math.floor(Math.random() *docs.length);
          //Skip a line for presentation of results
          console.log();
          //Print out first the customer's details
          console.log("ID:" + docs[randomUser]._id + "   Title:" + docs[randomUser].Title  + "   First Name(s):" + docs[randomUser].FirstNames + "  Surname:" + docs[randomUser].Surname + "   Mobile Number:" + docs[randomUser].Mobile + "   Email:" + docs[randomUser].Email );
          console.log();
          //Print out the customer's Home address
          console.log("Home Address of Customer-   Address Line 1:" + docs[randomUser].AddressHome.AddressLine1 + "    Address Line 2(Not Required):" + docs[randomUser].AddressHome.AddressLine2 + "   Town:" + docs[randomUser].AddressHome.Town + "   City/County:" + docs[randomUser].AddressHome.cityOrcounty + "   EIRCODE:" + docs[randomUser].AddressHome.EIRCODE );
          console.log();
          //Print out the customer's Billing address
          console.log("Billing Address of Customer-   Address Line 1:" + docs[randomUser].AddressBilling.AddressLine1 + "    Address Line 2(Not Required):" + docs[randomUser].AddressBilling.AddressLine2 + "   Town:" + docs[randomUser].AddressBilling.Town + "   City/County:" + docs[randomUser].AddressBilling.cityOrcounty + "   EIRCODE:" + docs[randomUser].AddressBilling.EIRCODE );
      });

      //Retrieving a random Items details
      const collection2 = db.collection('Items');
      //Find all documents in Items collection
      collection2.find({}).toArray(function(err, docs) 
      {
          //generate random index
          var randomUser =  Math.floor(Math.random() *docs.length);
          console.log()
          //print out the information in the document based on the index
          console.log("Manufacturer:"  + docs[randomUser].Manufacturer + "    Model:" + docs[randomUser].Model + "    Price:" + docs[randomUser].Price);
      });

      //Retrieving a random Order's details
      const collection3 = db.collection('Orders');
      //Find all documents in Orders
      collection3.find({}).toArray(function(err, docs) 
      {
          //Random index
          var randomUser =  Math.floor(Math.random() *docs.length);
          console.log()
          //Print out the details of the order at the random index
          console.log("Customer Id/Purchaser:"  + docs[randomUser].cust_id + "    Items Purchased:" + docs[randomUser].itemsPurchased );
      });
  }

  /*uncomment this to call the R of CRUD function
  retrieveDocumentsFromAllCollections(db,function()
  {
    MongoClient.close();
  });*/

  /*This function controls the U of CRUD and updates a 
  random customer's address and details, a random item's details
  and a random order's details*/
  const updateDetailsFromEachCollection = function(db)
  {
    //This part updates the Customer's email,mobile number,Title
    //and updates one of it's Customer's Home address information(Town)
    //and update one of the Customer's Billing address information(AddressLine2)
    const collection1 = db.collection('Customers');
    //Find all the documents in Customers collection
    collection1.find({}).toArray(function(err, docs) 
    {
          //we pick a random person and store their id
          var randomUser =  Math.floor(Math.random() *docs.length);
          var id = docs[randomUser]._id;
          //If the id we stored, matches any of the 
          //documents in Customer's collection we update that document
          collection1.updateMany({_id : id }
      , { $set: { Email :  "updated@gmail.com" ,
      Mobile:"1234567890" ,Title:"Mx.","AddressHome.Town":"lazyTown","AddressBilling.AddressLine2":"Downing Street"}}, function(err, result)   
      {
          if(err)throw err;
      }); 
    });

    //This part updates one item from the Item's collection
    const collection2 = db.collection('Items');
    //We find everything in the Items collection
    collection2.find({}).toArray(function(err, docs) 
    {
          //We pick a random item from items Collection and update it's price 
          var randomUser =  Math.floor(Math.random() *docs.length);
          var name = docs[randomUser].Price;
          collection2.updateOne({Price: name }
      , { $set: { Price:  "0.00" } }, function(err, result)   
        {
          if(err)throw err;
        }); 
    });

    //This part updates one item from the Orders's collection
    const collection3 = db.collection('Orders');
    //We find everything in the Orders collection
    collection3.find({}).toArray(function(err, docs) 
    {
          //We pick a random Order from Orders Collection and update the itemsPurchased in the order
          var randomUser =  Math.floor(Math.random() *docs.length);
          var name = docs[randomUser].itemsPurchased;
          collection3.updateOne({itemsPurchased: name }
      , { $set: { itemsPurchased:  "Talkman 320F" } }, function(err, result)   
        {
          if(err)throw err;
        }); 
    });
  }

  /*uncomment this to call the U of CRUD activites
  updateDetailsFromEachCollection(db,function()
  {
    MongoClient.close();
  })*/
  

  /*This function controls the D of CRUD and Deletes a 
  random customer's address and details, a random item's details
  and a random order's details*/
  /*Be careful using this method as I demonstrated 
  how to delete an order as well as deleting the order 
  corresponding to the deleted customer to delete 
  all records of the customer */
  const deleteFromAllCollection = function(db)
  {
      //This part deletes one item from the Customers collection
      const collection1 = db.collection('Customers');
      //We find everything in the Customers collection
      collection1.find({}).toArray(function(err, docs) 
      {
          //We pick a random customer from Customers and delete it based on their Mobile,Email and Title
          var randomUser =  Math.floor(Math.random() *docs.length);
          var mobile = docs[randomUser].Mobile;
          var title = docs[randomUser].Title;
          var email = docs[randomUser].Email;
          //We use this id from the delete customer to delete all instances of his orders
          var id = docs[randomUser]._id
          //This deletes the users details and address in one goes because of embedding
          collection1.deleteOne({ Mobile : mobile,Title:title,Email:email}
          , function(err, result)   
          {
            if(err)throw err;
          }); 
          //We also delete all orders by the now deleted customer ,hence we delete all records of the customer
          const collection3 = db.collection('Orders')
          collection3.deleteMany({cust_id:id},function(err,result)
          {
            if(err)throw err
          })
      }); 

      
      //This part deletes one item from the Items collection
      const collection2 = db.collection('Items');
      //We find everything in the Items collection
      collection2.find({}).toArray(function(err, docs) 
      {
          //We pick a random Item from Items and delete it 
          var randomUser =  Math.floor(Math.random() *docs.length);
          var name = docs[randomUser].Model;
          collection2.deleteOne({ Model : name}
          , function(err, result)   
          {
            if(err)throw err;
          }); 
      }); 


      //This part deletes one item from the Orders collection
      const collection3 = db.collection('Orders');
      //We find everything in the Orders collection
      collection3.find({}).toArray(function(err, docs) 
      {
          //We pick a random Order from Orders and delete it 
          var randomUser =  Math.floor(Math.random() *docs.length);
          var name = docs[randomUser].itemsPurchased;
          collection3.deleteOne({ itemsPurchased : name}
          , function(err, result)   
          {
            if(err)throw err;
          }); 
      }); 
  }

  /*uncomment this to call the D of CRUD activities
  deleteFromAllCollection(db, function()
  {
    MongoClient.close();
  });*/



})

/*BRIEF DESCRIPTION: For this assignment I used the online playgrounds repl.it and mongoDB Atlas.
In my database I have three collections Customers,Items and Orders.Each collection contains five
documents each.Customers colleciton holds the customers (id,title,firstname(s),surname,mobile and email)
but it also holds the customer's Billing and home Address as I used a denormalised data modelling approach
for this collection and embedded the addresses as objects in each Customer's document .Items holds the data
on each item(Manufacturer,Model,Price).Orders holds all information on an order made by a customer(cust_id,itemsPurchased).
I have Retrieve functions at the start of the code(showCustomer,showItems,showOrders) these are for the purpose of seeing
the initial sample data in the three collection I have 1 out of the three method calls uncomment as if you try to run all
three there will be too much data to be shown on the console so run one at a time.You should all make use of these retrieve
functions to see what is in the collection after performing some of the CRUD activities or all.I have implemented all the CRUD
functionality in the order C followed by it's call, R follwed by it's call,U followed by it's call and D followed by it's call.
You will need to uncomment and comment back these calls to test each of the CRUD activities individually*/

//Browser details(Doesn't apply here) Works on all browsers,Windows(OS),Browser version for Google Chrome:81.0.4044.113
