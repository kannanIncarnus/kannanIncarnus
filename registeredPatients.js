(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Registered Patient";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getpatients/2019-06-01/2019-07-04", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "regid": data[i]._id,
                    "regdatetime": data[i].registereddate,
                    "hospital": data[i]._id, //To Check
                    "hospitalunit": data[i]._id, //To Check
                    "mrn": data[i].mrn,
                    "gender": data[i].gender,
                    "agegroup": data[i]._id, //To Check
                    "patienttype": data[i].patienttype,
                    "country": data[i].country,
                    "state": data[i].state,
                    "city": data[i].city,
                    "pincode": data[i].zipcode,
                    "latitude": data[i]._id, //To Check
                    "longitude": data[i]._id, //To Check
                    "createdby": data[i]._id, //To Check
                    "createddatetime": data[i]._id, //To Check
                    "modifiedby": data[i]._id, //To Check
                    "modifieddatetime": data[i]._id //To Check
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }];

        
    
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
