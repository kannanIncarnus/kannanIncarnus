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
            },
            {
                id: "VISITDATETIME",
                alias: "VISITDATETIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "HOSPITAL",
                alias: "HOSPITAL",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "HOSPITALUNIT",
                alias: "HOSPITALUNIT",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "MRN",
                alias: "MRN",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "GENDER",
                alias: "GENDER",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Age",
                alias: "Age",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "PATIENTTYPE",
                alias: "PATIENTTYPE",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "COUNTRY",
                alias: "COUNTRY",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "STATE",
                alias: "STATE",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CITY",
                alias: "CITY",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "PLACE",
                alias: "PLACE",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "PINCODE",
                alias: "PINCODE",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "DEPARTMENT",
                alias: "DEPARTMENT",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "DOCTOR",
                alias: "DOCTOR",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "APPOINTMENTTYPE",
                alias: "APPOINTMENTTYPE",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "Payor",
                alias: "Payor",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CHECKINTIME",
                alias: "CHECKINTIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CHECKOUTTIME",
                alias: "CHECKOUTTIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CHIEFCOMPLAINT",
                alias: "CHIEFCOMPLAINT",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "REFSOURCE",
                alias: "REFSOURCE",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "REFSOURCENAME",
                alias: "REFSOURCENAME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "CREATEDBY",
                alias: "CREATEDBY",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "CREATEDDATETIME",
                alias: "CREATEDDATETIME",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "MODIFIEDBY",
                alias: "MODIFIEDBY",
                dataType: tableau.dataTypeEnum.string
            }
            ,
            {
                id: "MODIFIEDDATETIME",
                alias: "MODIFIEDDATETIME",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "EpisodeType",
                alias: "EpisodeType",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "FollowingEpisodeType",
                alias: "FollowingEpisodeType",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "AdmissionVisitID",
                alias: "AdmissionVisitID",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "Admissiondatetime",
                alias: "Admissiondatetime",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "AdmissionDoctor",
                alias: "AdmissionDoctor",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "VisitID",
                alias: "VisitID",
                dataType: tableau.dataTypeEnum.string
            } ,
            {
                id: "AdmissionDepartment",
                alias: "AdmissionDepartment",
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
