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
            id: "ADMISSIONID",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "ADMISSIONDATETIME",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "HOSPITAL",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "HOSPITALUNIT",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "MRN",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "TIMEOFBIRTH",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "PATIENTTYPE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "STATE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "CITY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "PLACE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "PINCODE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "COUNTRY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "ADMITDEPARTMENT",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "ADMITDOCTOR",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "ADMISSIONTYPE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "WARD",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "BED",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "MOTHERNAME",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "TYPEOFDELIVERY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "EXPECTEDDATEOFDELIVERY(EDD)",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "EXPECTEDDATEOFDELIVERY(EDD)",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "OBSTETRICIAN",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "CONDITIONOFBABY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "APGARSCORE",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "PEDIATRICIAN",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "CREATEDBY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "CREATEDDATETIME",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "MODIFIEDBY",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "MODIFIEDDATETIME",
            dataType: tableau.dataTypeEnum.date
        }
    ];
    
        var tableSchema = {
            id: "Newborn List",
            alias: "Newborn reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
