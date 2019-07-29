(function () {
    var myConnector = tableau.makeConnector();
    const limit = 10000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "Patients List";
                tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var createdat = table.incrementValue

        if (!createdat) {
            createdat = "2000-01-01"
        }
        else {
            console.log("createdat: " + createdat);
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getpatientsdata/" + limit + "/" + pagenumber + "/" + createdat

        $.getJSON(queryPath, function (resp) {
            var data = resp.patients;
            var totalrecords = resp.totalrecords;

            data.sort(function(arg1,arg2){
                return new Date(arg1.createdat) - new Date(arg2.createdat);
            });

            console.log("totalRecords in the collection: " + totalrecords);
            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                var serialno = (limit * (pagenumber-1)) + i;
                tableData.push({
                    "SNo": String(serialno+1),
                    "regid": data[i]._id,
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "regdatetime": data[i].registereddate,
                    "hospital": data[i].hospital,
                    "hospitalunit": data[i].hospitalunit,
                    "mrn": data[i].mrn,
                    "Age": data[i].age,
                    "gender": data[i].gender,
                    "agegroup": "", //To Check
                    "patienttype": data[i].patienttype,
                    "country": data[i].country,
                    "state": data[i].state,
                    "city": data[i].city,
                    "pincode": data[i].zipcode,
                    "latitude": "",
                    "longitude": "",
                    "createdat": data[i].createdat,
                    "createdby": data[i].createdby,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].createdat
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
            var cols = [{
                id: "id",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "SNo",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PatientName",
                alias: "Patient Name",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "mrn",
                alias: "mrn",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "Age",
                alias: "Age",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "createdat",
                alias: "createdat",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.datetime
            }, {
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id:"regdatetime",
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
            }];
        
            var tableSchema = {
                id: "Patients",
                alias: "Patient reports are listed here...........",
                columns: cols,
                incrementColumnId: "createdat"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();
