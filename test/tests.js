const expect = chai.expect

describe('removes markers', function () {
  it('removes markers from map when day is changed', function () {
    expect(removeMarkers()).to.deep.equal([])
  })
})
