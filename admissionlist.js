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

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/reportingservice/patientreports/getadmissionlist/2019-06-01/2019-07-04", function (resp) {
            var data = resp.admissionlist,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].admitdate,
                    "DischargeDateTime": data[i].dischargedate,
                    "DISCWARD": data[i].ward,
                    "OPVISITDATE": data[i].admitdate,
                    "FOLLOWUPDATE": data[i].followupdate, //To Check
                    "BedName": data[i].bed,
                    "createdby": data[i].createdby,
                    "createddatetime": data[i].createdat,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].modifiedat,
                    "DIDTRIAGE": data[i].traige, //To Check
                    "Readmission Date": data[i].readmitdate,
                    "ReadmissionDoctor": data[i].careprovider,
                    "ReadmissionDepartment": data[i].readmitdepartment, //To Check
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
                id: "ADMISSIONID",
                alias: "ADMISSIONID",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMISSIONDATETIME",
                alias: "ADMISSIONDATETIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "DischargeDateTime",
                alias: "DischargeDateTime",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "DISCWARD",
                alias: "DISCWARD",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "OPVISITDATE",
                alias: "OPVISITDATE",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "FOLLOWUPDATE",
                alias: "FOLLOWUPDATE",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "BedName",
                alias: "BedName",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "createddatetime",
                alias: "createddatetime",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "modifiedby",
                alias: "modifiedby",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "DIDTRIAGE",
                alias: "DIDTRIAGE",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "Readmission Date",
                alias: "Readmission Date",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "ReadmissionDoctor",
                alias: "ReadmissionDoctor",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "ReadmissionDepartment",
                alias: "ReadmissionDepartment",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "Admission Type",
                alias: "Admission Type",
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
