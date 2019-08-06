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

        var queryPath = "https://demo.incarnus.com:8080/thirdparty/tableauservice/patientreports/getlabresults/" + limit + "/" + pagenumber + "/" + createdat

        $.getJSON(queryPath, function (resp) {
            var data = resp.labresults;
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
                    "Visit": data[i].visit,
                    "VISITDATETIME": data[i].visitdatetime,
                    "EncounterType": data[i].episodetype,
                    "HOSPITAL": data[i].hospital,
                    "HOSPITALUNIT": data[i].hospitalunit,
                    "MRN": data[i].mrn,
                    "GENDER": data[i].gender,
                    "Age": data[i].age,
                    "DOB": data[i].dateofbirth,
                    "PATIENTTYPE": data[i].patienttype,
                    "COUNTRY": data[i].country,
                    "STATE": data[i].state,
                    "CITY": data[i].city,
                    "PLACE": data[i].area,
                    "PINCODE": data[i].zipcode,
                    "DEPARTMENT": data[i].department,
                    "DOCTOR": data[i].careprovider,
                    "LABRESULTS": "",
                    "createdat": data[i].createdat,
                    "createdby": data[i].createdby,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].modifiedat,
                    "LABTEST": data[i].name,
                    "RESULTNAME": data[i].name,
                    "RESULTVALUE": data[i].resultvalue,
                    "REFRANGE": data[i].normalrange,
                    "HLN": data[i].HLN,
                    "REMARKS": data[i].remarks,
                    "LABTECHNICIAN": data[i].approvedby,
                    "PATHOLOGIST": "",
                    "APPROVEDDATETIME": data[i].approvaldate,
                    "Order category": data[i].ordercategory,
                    "Order subcategory": data[i].ordersubcategory,
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
            },{
                id: "MRN",
                alias: "MRN",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "Visit",
                alias: "Visit",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "VISITDATETIME",
                alias: "VISITDATETIME",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "EncounterType",
                alias: "EncounterType",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "Order category",
                alias: "Order category",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "Order subcategory",
                alias: "Order subcategory",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "gender",
                alias: "gender",
                dataType: tableau.dataTypeEnum.string
            }, {
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
            }, {
                id: "DEPARTMENT",
                alias: "DEPARTMENT",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "DOCTOR",
                alias: "DOCTOR",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id: "createdat",
                alias: "createdat",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "modifieddatetime",
                alias: "modifieddatetime",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "createdby",
                alias: "createdby",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "modifiedby",
                alias: "modifiedby",
                dataType: tableau.dataTypeEnum.string
            } , {
                id: "APPROVEDDATETIME",
                alias: "APPROVEDDATETIME",
                dataType: tableau.dataTypeEnum.date
            }, {
                id: "Order category",
                alias: "Order category",
                dataType: tableau.dataTypeEnum.string
            }
            , {
                id: "Order subcategory",
                alias: "Order subcategory",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "HOSPITAL",
                alias: "HOSPITAL",
                dataType: tableau.dataTypeEnum.string
            }
            , {
                id: "HOSPITALUNIT",
                alias: "HOSPITALUNIT",
                dataType: tableau.dataTypeEnum.string
            }
            , {
                id: "SPECIMENTYPE",
                alias: "SPECIMENTYPE",
                dataType: tableau.dataTypeEnum.string
            },{
                id: "SAMPLENUMBER",
                alias: "SAMPLENUMBER",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "RESULTNAME",
                alias: "RESULTNAME",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "RESULTVALUE",
                alias: "RESULTVALUE",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "REFRANGE",
                alias: "REFRANGE",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "HLN",
                alias: "HLN",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "REMARKS",
                alias: "REMARKS",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "LABTECHNICIAN",
                alias: "LABTECHNICIAN",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PATHOLOGIST",
                alias: "PATHOLOGIST",
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
