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
                    "hospital": data[i].hospital,
                    "hospitalunit": data[i].hospitalunit,
                    "mrn": data[i].mrn, //mm
                    "gender": data[i].gender,
                    "agegroup": data[i].agegroup,
                    "age": data[i].age,
                    "patienttype": data[i].patienttype,
                    "country1": data[i].country,
                    "state1": data[i].state,
                    "city1": data[i].city,
                    "pincode": data[i].zipcode,
                    "DischargeDateTime": data[i].dischargedate,
                    "DISCWARD": data[i].ward,
                    "OPVISITDATE": data[i].regdatetime,
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
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "patienttype",
                alias: "patienttype",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "country1",
                alias: "country1",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "state1",
                alias: "state1",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "city1",
                alias: "city1",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "pincode",
                alias: "pincode",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "DischargeDateTime",
                alias: "DischargeDateTime",
                dataType: tableau.dataTypeEnum.datetime
            },{
                id: "DISCWARD",
                alias: "DISCWARD",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "OPVISITDATE",
                alias: "OPVISITDATE",
                dataType: tableau.dataTypeEnum.datetime
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
                dataType: tableau.dataTypeEnum.datetime
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
                id: "ReadmissionDate",
                alias: "ReadmissionDate",
                dataType: tableau.dataTypeEnum.datetime
            },{
                id: "ReadmissionDoctor",
                alias: "ReadmissionDoctor",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "ReadmissionDepartment",
                alias: "ReadmissionDepartment",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "AdmissionType",
                alias: "AdmissionType",
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
