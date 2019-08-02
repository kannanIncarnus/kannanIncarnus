const mongoose = require('mongoose');
const async = require('async');

const dischargeprocess = require('../models/inpatient/dischargeprocess');


exports.synchronize = function (patcallback) {
    const querylastmodified = mongoose.connection.db.collection('dw_dischargeprocess').find({ statusflag: 'A' });
    querylastmodified.sort(['modifiedat', -1]);
    querylastmodified.limit(1);
  
    querylastmodified.toArray((err, docs) => {
      let initialized = false;
      let lastmodified = new Date('2000-01-01');
      if (!err && docs != null && docs.length > 0) {
        lastmodified = docs[0].modifiedat;
        initialized = true;
      }
  
      console.log(`synchronizedischargeprocess based on ${lastmodified}`);
      if (initialized) {
        deleteAndUpdateRecords(lastmodified, patcallback);
      } else {
        updateDWRecords(lastmodified, patcallback);
      }
    });
  };

function deleteAndUpdateRecords(lastmodified, patcallback) {
    const query = dischargeprocess.find({ modifiedat: { $gt: lastmodified } }, { modifiedat: 1 });
    query.exec((err, docs) => {
      if (!err && docs != null && docs.length > 0) {
        const uids = [];
        for (let k = 0; k < docs.length; k++) {
          uids.push(docs[k]._id);
        }
  
        const updatequery = mongoose.connection.db.collection('dw_dischargeprocess').update({ _id: { $in: uids } }, { $set: { statusflag: 'D' } }, { multi: true }, (upderr, upddocs) => {
          updateDWRecords(lastmodified, patcallback);
        });
      } else {
        patcallback();
      }
    });
  }
  
  function updateDWRecords(lastmodified, patcallback) {
    const countquery = dischargeprocess.find({ statusflag: 'A', modifiedat: { $gt: lastmodified } });
    countquery.count((counterr, count) => {
      if (!counterr && count > 0) {
        const pagesize = 1000;
        const numberofpages = count / pagesize;
        const pages = [];
        for (let k = 0; k < numberofpages; k++) pages.push(k + 1);
  
  
        async.eachSeries(pages, (pagenumber, pagecallback) => {
          const query = dischargeprocess.aggregate([
            { $match: { statusflag: 'A', modifiedat: { $gt: lastmodified } } },
            { $skip: pagesize * (pagenumber - 1) },
            { $limit: pagesize },
            {
              $lookup: {
                from: 'patients', localField: 'patientuid', foreignField: '_id', as: 'patient',
              },
            },
            { $unwind: { path: '$patient', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'referencevalues', localField: 'patient.patienttypeuid', foreignField: '_id', as: 'patienttype',
              },
            },
            { $unwind: { path: '$patienttype', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                  from: 'areas', localField: 'address.areauid', foreignField: '_id', as: 'area',
                },
              },
              { $unwind: { path: '$area', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                  from: 'cities', localField: 'address.cityuid', foreignField: '_id', as: 'city',
                },
              },
              { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                  from: 'states', localField: 'address.stateuid', foreignField: '_id', as: 'state',
                },
              },
              { $unwind: { path: '$state', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                  from: 'countries', localField: 'address.countryuid', foreignField: '_id', as: 'country',
                },
              },
              { $unwind: { path: '$country', preserveNullAndEmptyArrays: true } },
              {
                $lookup: {
                  from: 'zipcodes', localField: 'address.zipcodeuid', foreignField: '_id', as: 'zipcode',
                },
              },
              { $unwind: { path: '$zipcode', preserveNullAndEmptyArrays: true } },
              {
              $lookup: {
                from: 'users', localField: 'patient.createdby', foreignField: '_id', as: 'createdby',
              },
            },
            { $unwind: { path: '$createdby', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'users', localField: 'patient.modifiedby', foreignField: '_id', as: 'modifiedby',
              },
            },
            { $unwind: { path: '$modifiedby', preserveNullAndEmptyArrays: true } },
            {
              $lookup: {
                from: 'organisations', localField: 'orguid', foreignField: '_id', as: 'orguid',
              },
            },
            { $unwind: { path: '$orguid', preserveNullAndEmptyArrays: true } },

            // "dischargestage" : 4,
            // "dischargingcareprovideruid" : ObjectId("56f5160411fbe927aa7189fc"),
            // "beduid" : ObjectId("584153a73479008a27eb8c0f"),
            // "warduid" : ObjectId("569ceb383b008e21f3ecfa0e"),
            // "patientvisituid" : ObjectId("5886e405ace815ff167b5769"),

            {
              $project: {
                _id: 1,
                PatientName: '$PatientName',
                medicaldischargedate: '$medicaldischargedate',
                dischargecomments: '$dischargeplancomments',
                finaldischargedate: '$finaldischargedate',
                regdatetime: '$regdatetime',
                hospital: '$hospital',
                hospitalunit: '$hospitalunit',
                mrn: '$mrn',
                gender: '$gender',
                patienttype: '$patienttype',
                area: '$area.name',
                city: '$city.name',
                state: '$state.name',
                country: '$country.name',
                zipcode: '$zipcode.name',
                createdat: '$createdat',
                createdby: '$createdby',
                modifiedby: '$modifiedby',
                modifieddatetime: '$modifieddatetime',
              },
            },  
          ]);
  
          query.exec((err, docs) => {
            if (err == null && docs != null && docs.length > 0) {
              console.log(`insertMany ${docs.length}`);
  
              const bulkinsert = mongoose.connection.db.collection('dw_dischargeprocess').initializeUnorderedBulkOp();
              for (let k = 0; k < docs.length; k++) {
                bulkinsert.insert(docs[k]);
              }
              bulkinsert.execute((err2, docs2) => {
                pagecallback();
              });
            } else {
              console.log(err);
              pagecallback();
            }
          });
        }, () => {
          patcallback();
        });
      } else {
        patcallback();
      }
    });
  }
  