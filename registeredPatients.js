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
                    "regid": data[i]._id
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
            },{
            id: "regdatetime",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "hospital",
            alias: "hospital",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "hospitalunit",
            alias: "hospital unit",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "mrn",
            alias: "mrn",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"gender",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id: "age",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "agegroup",
            alias: "age group",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "patienttype",
            alias: "patient type",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "country",
            alias: "country",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"state",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"city",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"pincode",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"latitude",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"longitude",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"createdby",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"createddatetime",
            dataType: tableau.dataTypeEnum.string},
            ,{
            id:"modifieddatetime",
            dataType: tableau.dataTypeEnum.string}];
    
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
