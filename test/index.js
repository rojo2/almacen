describe("Almacen", function() {

  it("should set data in the localStorage", function() {

    almacen.local.set("string", "hello");
    almacen.local.set("number", 23);
    almacen.local.set("boolean", true);
    almacen.local.set("array", [1,2,3,4,5,6]);
    almacen.local.set("object", { "foo": "bar" });

    expect(almacen.local.has("date")).to.equal(false);
    expect(almacen.local.has("string")).to.equal(true);
    expect(almacen.local.has("number")).to.equal(true);
    expect(almacen.local.has("boolean")).to.equal(true);
    expect(almacen.local.has("array")).to.equal(true);
    expect(almacen.local.has("object")).to.equal(true);

    expect(almacen.local.get("string")).to.equal("hello");
    expect(almacen.local.get("number")).to.equal(23);
    expect(almacen.local.get("boolean")).to.equal(true);
    expect(almacen.local.get("array")).to.have.property("length").to.equal(6);
    expect(almacen.local.get("object")).to.have.property("foo").to.equal("bar");

  });

});
