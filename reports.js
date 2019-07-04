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
        $.getJSON("http://52.220.168.61:8850/thirdparty/tableauservice/patientreports/getpatients/2019-06-01/2019-07-04", function(resp) {
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
