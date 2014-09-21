 /***** SQLite DB Operations *****/
    var db;
    var shortName = 'AirOpsDB';
    var version = '1.0';
    var displayName = 'AirOpsDB';
    var maxSize = 65535;
    var db = openDatabase(shortName, version, displayName , maxSize); 

    function errorHandler(tx, error) {  debug.log('Error: ' + error.message + ' code: ' + error.code); }

    function nullHandler(){};

    function successCallBack() { debug.log("DEBUGGING: success"); }

    function onBodyLoad(){
        debug.log("DEBUGGING: we are in the onBodyLoad() function");

        if (!window.openDatabase) {  
           console.log('Databases are not supported in this browser.');
           return;
        }
    
        db.transaction(function(tx){ 
            tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(
                UserId INTEGER NOT NULL PRIMARY KEY, 
                FirstName TEXT NOT NULL, LastName TEXT NOT NULL)',[],nullHandler,errorHandler);
        },errorHandler,successCallBack); 
    }

    function ListDBValues() {

     if (!window.openDatabase) {
      console.log('Databases are not supported in this browser.');
      return;
     }
     
     $('#lbUsers').html(''); 

     db.transaction(function(tx) {
       tx.executeSql('SELECT * FROM User;', [],
         function(tx, result) {
          if (result != null && result.rows != null) {
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              $('#lbUsers').append('<br>' + row.UserId + '. ' + row.FirstName+ ' ' + row.LastName);
            }
          }
         },errorHandler);
     },errorHandler,nullHandler);

     return; 
    }

    function AddValueToDB() {
  
     db.transaction(function(tx) {
       tx.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()],
         nullHandler,errorHandler);
       },errorHandler,successCallBack); 
     
     ListDBValues();

     return false;

    }

    function updateRecord(){ // Get id of record . Function Call when Delete Button Click.. 
     
        var usernameupdate = $('input:text[id=username]').val().toString(); 
        var useremailupdate = $('input:text[id=useremail]').val().toString(); 
        var useridupdate = $("#id").val(); 
        db.transaction(function (tx) { tx.executeSql('', [usernameupdate, useremailupdate, Number(useridupdate)], nullHandler, onError); }); 
    }

    function deleteRecord(id) // Get id of record . Function Call when Delete Button Click.. 
    { 
        var iddelete = id.toString(); 
        db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); }); 
        resetForm(); 
    }

    function syncDB(){ // Sync appDB to remoteDB 

    } 