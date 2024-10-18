import type { NextApiRequest, NextApiResponse } from 'next';
import { Builder, By } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

  try {
    await driver.get(url as string);
    const name = await driver.findElement(By.css('.top-card-layout__title')).getText();
    const photoUrl = await driver.findElement(By.css('.profile-photo-edit__preview')).getAttribute('src');

    res.status(200).json({ name, photoUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape profile' });
  } finally {
    await driver.quit();
  }
}
