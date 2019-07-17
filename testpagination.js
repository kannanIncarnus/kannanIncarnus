(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "test List";

                tableau.submit();
        });
    });


    myConnector.getData = function (table, doneCallback) {

        var modifiedat = table.incrementValue
        console.log("modifiedat: " + modifiedat);

        if (!modifiedat) {
            modifiedat = "2000-01-01"
        }
        else {
            tableData = [];
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getregisteredpatientsdata/" + limit + "/" + pagenumber + "/" + modifiedat

        $.getJSON(queryPath, function (resp) {
            var data = resp.registeredpatients;
            var totalrecords = resp.totalrecords;

            // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "SNo": String((limit * (pagenumber-1))+i),
                    "regid": data[i]._id,
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "regdatetime": data[i].registereddate,
                    "hospital": "",
                    "hospitalunit": "", //To Check
                    "mrn": data[i].mrn,
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
                    "modifieddatetime": data[i].modifiedat
                });
            }

                if ((limit * pagenumber) < totalrecords) {
                    console.log("Fetching Again");
                    console.log("totalRecords: " + (limit * pagenumber));
                    pagenumber++;
                    myConnector.getData(table, doneCallback);
                }
                else {
                    pagenumber = 1;
                    table.appendRows(tableData);
                    console.log("Completed");
                    console.log("Records: " + tableData.length);
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
                id: "Registered",
                alias: "Patient reports are listed here...........",
                columns: cols,
                incrementColumnId: "modifieddatetime"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();
