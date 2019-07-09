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
                    "Visit": data[i].entype,
                    "VISITDATETIME": data[i].visitdate,
                    "HOSPITAL": data[i].hospital,  //to check
                    "HOSPITALUNIT": data[i]._id, //to check
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
                    "Payor": data[i].payor,
                    "CHECKINTIME": data[i]._id,
                    "CHECKOUTTIME": data[i]._id,
                    "CHIEFCOMPLAINT": data[i]._id,
                    "REFSOURCE": data[i]._id,
                    "REFSOURCENAME": data[i]._id,
                    "CREATEDBY": data[i]._id,
                    "CREATEDDATETIME": data[i].createdat,
                    "MODIFIEDBY": data[i]._id,
                    "MODIFIEDDATETIME": data[i].modifiedat,
                    "Episode Type": data[i]._id,
                    "Following Episode Type": data[i]._id,
                    "Admission Visit ID": data[i]._id,
                    "Admissiondatetime": data[i]._id,
                    "AdmissionDoctor": data[i]._id,
                    "VisitID": data[i].visitid,
                    "AdmissionDepartment": data[i]._id,
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
            dataType: tableau.dataTypeEnum.string},
            {
            id:"REFSOURCE",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"REFSOURCENAME",
            dataType: tableau.dataTypeEnum.string
                },{
            id:"CREATEDBY",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"CREATEDDATETIME",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"MODIFIEDBY",
            dataType: tableau.dataTypeEnum.string},
             {
            id: "MODIFIEDDATETIME",
            alias: "MODIFIEDDATETIME",
            dataType: tableau.dataTypeEnum.string
            },
            {
            id:"EpisodeType",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"FollowingEpisodeType",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"AdmissionVisitID",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"Admissiondatetime",
            dataType: tableau.dataTypeEnum.string},
            {
            id:"AdmissionDoctor",
            dataType: tableau.dataTypeEnum.string
            },{
            id:"AdmissionDepartment",
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
