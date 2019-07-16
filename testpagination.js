(function () {
    var myConnector = tableau.makeConnector();
    const limit = 100;
    var pagenumber = 1;
    tableData = [];

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
                tableau.connectionName = "test List";

                tableau.submit();
        });
    });


    myConnector.getData = function (table, doneCallback) {

        // var createdat = table.incrementValue
        // console.log("createdat: " + createdat);

        $.getJSON("https://demo.incarnus.com:8850/thirdparty/tableauservice/patientreports/getpatientswithpagination/" + limit + "/" + pagenumber, function (resp) {
            var data = resp.registeredpatients;
            let totalrecords = resp.totalrecords;

                // Iterate over the JSON object
            for (var i = 0, len = data.length; i < len; i++) {
                tableData.push({
                    "S.No": String((limit * (pagenumber-1))+i),
                    "regid": data[i]._id,
                    "id": data[i]._id,
                    "PatientName": data[i].firstname,
                    "createdat": data[i].createdat,
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
                    "createdby": data[i].createdby,
                    "createddatetime": data[i].createddatetime,
                    "modifiedby": data[i].modifiedby,
                    "modifieddatetime": data[i].modifieddatetime
                });
            }

                if ((limit * pagenumber) < totalrecords) {
                    console.log("Fetching Again");
                    console.log("totalRecords: " + (limit * pagenumber));
                    pagenumber++;
                    myConnector.getData(table, doneCallback);
                }
                else {
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
                id: "S.No",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "PatientName",
                alias: "Patient Name",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "createdat",
                alias: "createdat",
                dataType: tableau.dataTypeEnum.string
            }, {
                id: "email",
                alias: "e-mail",
                dataType: tableau.dataTypeEnum.string
            },
            {
                id:"registereddate",
                dataType: tableau.dataTypeEnum.string
            }];
        
            var tableSchema = {
                id: "Registered",
                alias: "Patient reports are listed here...........",
                columns: cols,
                // incrementColumnId: "createdat"
            };
        
            schemaCallback([tableSchema]);
        };
    })();
