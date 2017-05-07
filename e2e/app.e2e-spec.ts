import { HumanCodeDemoPage } from './app.po';

describe('human-code-demo App', () => {
  let page: HumanCodeDemoPage;

  beforeEach(() => {
    page = new HumanCodeDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
