// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const { PropertiesMock } = require('./PropertiesMock');

const skip = sinon.stub();
skip.withArgs().resolves(PropertiesMock);
skip.withArgs(10).resolves([]);
const sort = sinon.stub();
sort.withArgs().returns({ skip });
const limit = sinon.stub();
limit.withArgs().returns({ sort });
const findStub = sinon.stub();
findStub.returns({ limit });

const countDocumentsStub = sinon.stub();
countDocumentsStub.withArgs().resolves(10);

const findOneStub = sinon.stub();
findOneStub.withArgs().resolves(PropertiesMock[0]);

const find = () => findStub();

const findOne = () => findOneStub();

const countDocuments = () => countDocumentsStub();


module.exports = {
  findStub,
  findOneStub,
  countDocumentsStub,
  mongooseLib: {
    find,
    findOne,
    countDocuments,
  },
};
