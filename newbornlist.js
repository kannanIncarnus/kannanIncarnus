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
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].admitdate,
                    "HOSPITAL": data[i].hospital,
                    "HOSPITALUNIT": data[i].hospitalunit,
                    "MRN": data[i].mrn,
                    "GENDER": data[i].gender,
                    "TIMEOFBIRTH": data[i].id,
                    "PATIENTTYPE": data[i].patienttype,
                    "STATE":data[i].state,
                    "CITY":data[i].city,
                    "PLACE":data[i].area,
                    "PINCODE":data[i].pincode,
                    "COUNTRY":data[i].country,
                    "ADMITDEPARTMENT": data[i].department,
                    "ADMITDOCTOR": data[i].careprovider,
                    "ADMISSIONTYPE": data[i].admtype,
                    "WARD": data[i].ward,
                    "BED": data[i].bed,
                    "MOTHERNAME": data[i].mothername,
                    "TYPEOFDELIVERY": data[i].deliverytype,
                    "EXPECTEDDATEOFDELIVERY(EDD)": data[i].EDD,
                    "OBSTETRICIAN": data[i].obsterician,
                    "CONDITIONOFBABY": data[i].condition,
                    "APGARSCORE": data[i].apgarscore,
                    "PEDIATRICIAN": data[i].pediatrician,
                    "CREATEDBY": data[i].createdby,
                    "CREATEDDATETIME": data[i].regid,
                    "MODIFIEDBY": data[i].modifiedby,
                    "MODIFIEDDATETIME": data[i].modifiedat
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
