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
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getadmissionlist/2019-06-01/2019-07-04", function (resp) {
            var data = resp.admissionlist,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "ADMISSIONID": data[i]._id,
                    "ADMISSIONDATETIME": data[i].admitdate,
                    "ADMITDEPARTMENT": data[i].department,
                    "ADMITDOCTOR": data[i].careprovider,
                    "hospital": data[i].hospital,
                    "hospitalunit": data[i].hospitalunit,
                    "mrn": data[i].mrn,
                    "gender": data[i].gender,
                    "agegroup": data[i].agegroup,
                    "age": data[i].age,
                    "patienttype": data[i].patienttype,
                    "country": data[i].country,
                    "state": data[i].state,
                    "city": data[i].city,
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
                    "DIDTRIAGE": data[i].triage,
                    "Readmission Date": data[i].admitdate,
                    "ReadmissionDoctor": data[i].careprovider,
                    "ReadmissionDepartment": data[i].department,
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
            },
            {
                id: "ADMITDEPARTMENT",
                alias: "ADMITDEPARTMENT",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "ADMITDOCTOR",
                alias: "ADMITDOCTOR",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "hospital",
                alias: "hospital",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "hospitalunit",
                alias: "hospitalunit",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "agegroup",
                alias: "agegroup",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "age",
                alias: "age",
                dataType: tableau.dataTypeEnum.int
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
