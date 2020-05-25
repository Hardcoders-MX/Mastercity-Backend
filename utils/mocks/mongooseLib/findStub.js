const sinon = require('sinon');
const { PropertiesMock } = require('../PropertiesMock');
const { FavoritesMock } = require('../FavoritesMock');

const populateStub = sinon.stub();
const skip = sinon.stub();
const sort = sinon.stub();
const limit = sinon.stub();
const findStub = sinon.stub();

populateStub.withArgs('property').resolves(FavoritesMock);
skip.withArgs().resolves(PropertiesMock);
skip.withArgs(10).resolves([]);
sort.withArgs().returns({ skip });
limit.withArgs().returns({ sort });
findStub.returns({ limit });
findStub.withArgs({ user: FavoritesMock[0].user }).returns({ populate: populateStub });

module.exports = {
  findStub,
  populateStub,
};
