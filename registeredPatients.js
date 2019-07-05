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
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getpatients/2019-06-01/2019-07-04", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "regid": data[i]._id,
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "createdat": data[i].createdat,
                    "regdatetime": data[i].registereddate,
                    "hospital": "",
                    "hospitalunit": "",
                    "mrn": data[i].mrn,
                    "gender": data[i].gender,
                    "agegroup": "", //To Check
                    "patienttype": data[i].patienttype,
                    "country": data[i].country,
                    "state": data[i].state,
                    "city": data[i].city,
                    "pincode": data[i].zipcode,
                    "latitude": "",
                    "longitude": "",
                    "createdby": data[i].createdby,
                    "createddatetime": "",
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": ""
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
        {
            id: "regid",
            dataType: tableau.dataTypeEnum.string
        },
            {
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
            id: "gender",
            alias: "gender",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id:"registereddate",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "patienttype",
            alias: "patienttype",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "country",
            alias: "country",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "state",
            alias: "state",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "city",
            alias: "city",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "pincode",
            alias: "pincode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "createdby",
            alias: "createdby",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "modifiedby",
            alias: "modifiedby",
            dataType: tableau.dataTypeEnum.string
        }
    ];
    
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
