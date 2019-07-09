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
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMISSIONDATETIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "DischargeDateTime",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "DISCWARD",
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
