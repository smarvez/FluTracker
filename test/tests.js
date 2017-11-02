const expect = chai.expect

describe('removes markers', function () {
  it('removes markers from map when day is changed', function () {
    expect(removeMarkers()).to.deep.equal([])
  })
})

describe('initMap', function () {
  it('is a function', function () {
    expect(initMap).to.be.a('function')
  })
})

describe('attachSecretMessage', function () {
  it('is a function', function () {
    expect(attachSecretMessage).to.be.a('function')
  })
})
