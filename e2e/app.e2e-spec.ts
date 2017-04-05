import { SaferoadPage } from './app.po';

describe('saferoad App', function() {
  let page: SaferoadPage;

  beforeEach(() => {
    page = new SaferoadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
