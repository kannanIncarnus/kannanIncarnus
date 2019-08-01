(function () {
    var myConnector = tableau.makeConnector();
    const limit = 1000;
    var pagenumber = 1;
    tableData = [];

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "Labresults List";
                tableau.submit();
        });
    });

    myConnector.getData = function (table, doneCallback) {
        var createdat = table.incrementValue

        if (!createdat) {
            createdat = "2000-01-01" //Default Value
        }
        else {
            console.log("createdat: " + createdat);
        }

        var queryPath = "https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getlabresults/" + limit + "/" + pagenumber + "/" + createdat

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
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "age": data[i].age,
                    "Visit": data[i].visit,
                    "VISITDATETIME": data[i].visitdatetime,
                    "EncounterType": data[i].episodetype,
                    "HOSPITAL": data[i].hospital,
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
                    "LABRESULTS": data[i].firstname,
                    "createdat": data[i].createdat,
                    "createdby": data[i].createdby,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].createdat,
"LABTEST": data[i].test,
"SPECIMENTYPE": data[i].test,
"SAMPLENUMBER": data[i].test,
"SAMPLECOLLDATETIME": data[i].test,
"PHLEBOTOMIST": data[i].test,
"SAMPLERECEIVEDTIME": data[i].test,
"TESTDONETIME": data[i].test,
"RESULTNAME": data[i].test,
"RESULTVALUE": data[i].test,
"REFRANGE": data[i].test,
"UOM": data[i].test,
"REMARKS": data[i].test,
"LABTECHNICIAN": data[i].test,
"PATHOLOGIST": data[i].test,
"APPROVEDDATETIME": data[i].test,
"Billing group": data[i].test,
"Billing subgroup": data[i].test,
"Order category": data[i].test,
"Order subcategory": data[i].test,
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
            },
            {
                id: "MRN",
                alias: "MRN",
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
            }];
        
            var tableSchema = {
                id: "Patients",
                alias: "Patient lab reports are listed here...........",
                columns: cols,
                incrementColumnId: "createdat"
            };
        
            schemaCallback([tableSchema]);
        };

    tableau.registerConnector(myConnector);
    })();
