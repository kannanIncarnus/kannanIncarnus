(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Admission List";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getadmissionlist/2019-06-01/2019-07-04", function(resp) {
            var data = resp.patients,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].admdate, //To Check
                    "DischargeDateTime": data[i].medicaldischargedate,
                    "DISCWARD": data[i].dischargeward, //To Check
                    "OPVISITDATE": data[i].opdvisitdate,
                    "FOLLOWUPDATE": data[i].followupdate, //To Check
                    "createdby": data[i].createdby,
                    "createddatetime": data[i].createdat,
                    "modifiedby": data[i].country,
                    "modifieddatetime": data[i].modifiedat,
                    "DIDTRIAGE": data[i].traige,
                    "Readmission Date": data[i].readmdate,
                    "ReadmissionDoctor": data[i].careprovidername,
                    "ReadmissionDepartment": data[i].readmdepartment, //To Check
                    "Admission Type": data[i].admtype //To Check
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
            id: "ADMISSIONDATETIME",
            dataType: tableau.dataTypeEnum.string
            },{
            id: "DischargeDateTime",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "DISCWARD",
            alias: "DISCWARD",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "BedName",
            alias: "BedName",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "OPVISITDATE",
            alias: "OPVISITDATE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"FOLLOWUPDATE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id: "createdby",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "createddatetime",
            alias: "createddatetime",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "modifiedby",
            alias: "modifiedby",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "DIDTRIAGE",
            alias: "DIDTRIAGE",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"Readmission Date",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"ReadmissionDoctor",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"ReadmissionDepartment",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"Admission Type",
            dataType: tableau.dataTypeEnum.string}
        ];
            
        var tableSchema = {
            id: "patientFeed",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };
})();
