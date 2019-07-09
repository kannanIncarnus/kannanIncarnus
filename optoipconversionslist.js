(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "OP to IP Conversion List";
            tableau.submit();
        });
    });

    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://demo.incarnus.com:8850/thirdparty/reportingservice/patientreports/getoptoipconversionlist/2019-06-01/2019-07-04", function(resp) {
            var data = resp.getopipconversionlist,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "Visit": data[i].encounter,
                    "VISITDATETIME": data[i].admitdate,
                    "HOSPITAL": data[i].hospital,  //to check
                    "HOSPITALUNIT": data[i].hospitalunit,
                    "MRN": data[i].mrn,
                    "GENDER": data[i].gender,
                    "Age": data[i].age,
                    "PATIENTTYPE": data[i].patienttype,
                    "COUNTRY": data[i].country,
                    "STATE": data[i].state,
                    "CITY": data[i].city,
                    "PLACE": data[i].area,
                    "PINCODE": data[i].pincode,
                    "DEPARTMENT": data[i].department,
                    "DOCTOR": data[i].careprovider,
                    "APPOINTMENTTYPE": data[i].apmttype,
                    "Payor": data[i].payor2,
                    "CHECKINTIME": data[i].admitdate,
                    "CHECKOUTTIME": data[i].dischargedate,
                    "CHIEFCOMPLAINT": "",
                    "REFSOURCE": "",
                    "REFSOURCENAME": "",
                    "CREATEDBY": data[i].createdby,
                    "CREATEDDATETIME": data[i].createdat,
                    "MODIFIEDBY": data[i].modifiedby,
                    "MODIFIEDDATETIME": data[i].modifiedat,
                    "Episode Type": "",
                    "Following Episode Type": "",
                    "Admission Visit ID": data[i].patientvisituid,
                    "Admissiondatetime": data[i].admitdate,
                    "AdmissionDoctor": data[i].careprovider,
                    "VisitID": data[i].visitid,
                    "AdmissionDepartment": data[i].department,
                    });                    
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };
    
    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
            id: "Visit",
            dataType: tableau.dataTypeEnum.string
            },{
            id: "VisitID",
            dataType: tableau.dataTypeEnum.string
            }, {
             id: "VISITDATETIME",
            alias: "VISITDATETIME",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "HOSPITAL",
            alias: "HOSPITAL",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "HOSPITALUNIT",
            alias: "HOSPITALUNIT",
            dataType: tableau.dataTypeEnum.string
            },
            {
           id:"MRN",
           dataType: tableau.dataTypeEnum.string
            },
            {
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "Age",
            alias: "age",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "PATIENTTYPE",
            alias: "PATIENTTYPE",
            dataType: tableau.dataTypeEnum.string
            }, {
            id: "COUNTRY",
            alias: "COUNTRY",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"STATE",
            dataType: tableau.dataTypeEnum.string
             },{
            id:"CITY",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"PLACE",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"PINCODE",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"DEPARTMENT",
            dataType: tableau.dataTypeEnum.string
             },{
            id:"DOCTOR",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"VisitType",
            dataType: tableau.dataTypeEnum.string},
             ,{
             id:"APPOINTMENTTYPE",
             dataType: tableau.dataTypeEnum.string},
             {
             id: "Payor",
            alias: "Payor",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"CHECKINTIME",
            dataType: tableau.dataTypeEnum.string
                },{
            id:"CHECKOUTTIME",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"CHIEFCOMPLAINT",
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
