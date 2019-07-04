(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Patient Reports";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://192.168.168.92:8080/framework/reportingservice/patientreports/getpatients/2018-01-01/2018-01-04", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "createdat": data[i].createdat,
                    "email": data[i].email,
                    "registereddate": data[i].registereddate
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
        }, {
            id: "PatientName",
            alias: "Patient Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "createdat",
            alias: "createdat",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "email",
            alias: "e-mail",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id:"registereddate",
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
    
    
})();
