// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const { PropertiesMock } = require('./PropertiesMock');
const { FavoritesMock } = require('./FavoritesMock');

const populateStub = sinon.stub();
populateStub.withArgs('property').resolves(FavoritesMock);

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
findOneStub.withArgs({
  user: FavoritesMock[0].user,
  property: FavoritesMock[0].property,
}).resolves(null);
findOneStub.withArgs({
  user: FavoritesMock[0].property,
  property: FavoritesMock[0].user,
}).resolves(FavoritesMock[0]);

const createStub = sinon.stub();
createStub.withArgs({
  user: FavoritesMock[0].user,
  property: FavoritesMock[0].property,
}).resolves(FavoritesMock[0]);

const find = (query) => findStub(query);

const findOne = (query) => findOneStub(query);

const countDocuments = () => countDocumentsStub();

const create = (query) => createStub(query);

module.exports = {
  findStub,
  findOneStub,
  countDocumentsStub,
  populateStub,
  createStub,
  mongooseLib: {
    find,
    findOne,
    countDocuments,
    create,
  },
};
