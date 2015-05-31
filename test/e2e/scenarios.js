describe('routing', function() {
  beforeEach(function() {

  });

  it('for main', function() {
    browser.get('#/');
    expect(browser.getLocationAbsUrl()).toBe('/');

    expect(element.all(by.repeater('thing in awesomeThings')).count()).toBe(3);
  });

  it('for about', function() {
    browser.get('#/about');
    expect(browser.getLocationAbsUrl()).toBe('/about');
  });

  it('for contact', function() {
    browser.get('#/contact');
    expect(browser.getLocationAbsUrl()).toBe('/contact');
  });

});