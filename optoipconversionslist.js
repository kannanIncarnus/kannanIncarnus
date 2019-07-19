(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "OP to IP Conversion List";
            tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var modifiedat = table.incrementValue

        if (!modifiedat) {
            modifiedat = "2000-01-01"
        }
        else {
            console.log("modifiedat: " + modifiedat);
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getoptoipconversionlist/" + limit + "/" + pagenumber //+ "/" + modifiedat

        $.getJSON(queryPath, function (resp) {
            var data = resp.getopipconversionlist;
            var totalrecords = resp.totalrecords;
    
            console.log("totalRecords in the collection: " + totalrecords);
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                var serialno = (limit * (pagenumber-1)) + i;
                tableData.push({
                    "SNo": String(serialno+1),
                    "Visit": data[i].visitperiod,
                    "VISITDATETIME": data[i].registereddate,
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
                    "APPOINTMENTTYPE": data[i].encounter,
                    "Payor": data[i].payor1,
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
                    "VisitID": data[i].patientvisituid,
                    "AdmissionDepartment": data[i].department,
                    });                    
            }
            
            var currentrecords = (limit * pagenumber);
            if (currentrecords < totalrecords) {
                console.log("Fetching Again with currentrecords: " + currentrecords);
                pagenumber++;
                myConnector.getData(table, doneCallback);
            }
            else {
                pagenumber = 1;
                table.appendRows(tableData);
                console.log("CompletedRecords: " + tableData.length);
                tableData = [];
                doneCallback();
            }
        });
    };

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            {
                id: "SNo",
                dataType: tableau.dataTypeEnum.string
            },
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
                 id: "Visit",
                 dataType: tableau.dataTypeEnum.string
            },
            {
                id: "VISITDATETIME",
                alias: "VISITDATETIME",
                dataType: tableau.dataTypeEnum.datetime
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
                dataType: tableau.dataTypeEnum.datetime
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
            id: "OPtoIPConversions",
            alias: "Patient reports are listed here...........",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    tableau.registerConnector(myConnector);
})();
