import { CanvasPage } from './app.po';

describe('canvas App', () => {
  let page: CanvasPage;

  beforeEach(() => {
    page = new CanvasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
