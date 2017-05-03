import { PagevoyagerPage } from './app.po';

describe('pagevoyager App', () => {
  let page: PagevoyagerPage;

  beforeEach(() => {
    page = new PagevoyagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
