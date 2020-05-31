// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const { PropertiesMock } = require('../PropertiesMock');
const { FavoritesMock } = require('../FavoritesMock');

const populateStub = sinon.stub();
const skip = sinon.stub();
const sort = sinon.stub();
const limit = sinon.stub();
const findStub = sinon.stub();

populateStub.withArgs('property').resolves(FavoritesMock);
populateStub.withArgs('offerer').resolves(PropertiesMock);
populateStub.withArgs().resolves([]);
skip.withArgs().returns({ populate: populateStub });
skip.withArgs(10).returns({ populate: () => populateStub() });
sort.withArgs().returns({ skip });
limit.withArgs().returns({ sort });
findStub.returns({ limit });
findStub.withArgs({ user: FavoritesMock[0].user, isDisabled: false }).returns({ populate: populateStub });

module.exports = {
  findStub,
  populateStub,
};
