// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const { PropertiesMock } = require('./PropertiesMock');
const { FavoritesMock } = require('./FavoritesMock');

const populateStub = sinon.stub();
populateStub.withArgs('property').resolves(FavoritesMock[0]);

const skip = sinon.stub();
skip.withArgs().resolves(PropertiesMock);
skip.withArgs(10).resolves([]);
const sort = sinon.stub();
sort.withArgs().returns({ skip });
const limit = sinon.stub();
limit.withArgs().returns({ sort });
const findStub = sinon.stub();
findStub.returns({ limit });
findStub.withArgs({ user: FavoritesMock[0].user }).returns({ populate: populateStub });

const countDocumentsStub = sinon.stub();
countDocumentsStub.withArgs().resolves(10);

const findOneStub = sinon.stub();
findOneStub.withArgs().resolves(PropertiesMock[0]);

const find = (query) => findStub(query);

const findOne = () => findOneStub();

const countDocuments = () => countDocumentsStub();


module.exports = {
  findStub,
  findOneStub,
  countDocumentsStub,
  populateStub,
  mongooseLib: {
    find,
    findOne,
    countDocuments,
  },
};
