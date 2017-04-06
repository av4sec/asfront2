import { Asfront2Page } from './app.po';

describe('asfront2 App', () => {
  let page: Asfront2Page;

  beforeEach(() => {
    page = new Asfront2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('asfront2 works!');
  });
});
