import { browser, element, by } from 'protractor';

export class Asfront2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('asfront-root h1')).getText();
  }
}
