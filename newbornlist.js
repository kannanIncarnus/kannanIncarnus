(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "New Born";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/newbornlist/2019-06-01/2019-07-04", function(resp) {
            var data = resp.newbornlist,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "ADMISSIONID": data[i].regid,
                    "ADMISSIONDATETIME": data[i].regid,
                    "HOSPITAL": data[i].regid,
                    "HOSPITALUNIT": data[i].regid,
                    "MRN": data[i].regid,
                    "GENDER": data[i].regid,
                    "TIMEOFBIRTH": data[i].regid,
                    "PATIENTTYPE": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,
                    "COUNTRY": data[i].regid,








STATE
CITY
PLACE
PINCODE
ADMITDEPARTMENT
ADMITDOCTOR
ADMISSIONTYPE
WARD
BED
MOTHERNAME
TYPEOFDELIVERY
EXPECTEDDATEOFDELIVERY (EDD)
OBSTETRICIAN
CONDITIONOFBABY
APGARSCORE
PEDIATRICIAN
CREATEDBY
CREATEDDATETIME
MODIFIEDBY
MODIFIEDDATETIME
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "regid",
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
