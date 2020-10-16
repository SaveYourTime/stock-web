# stock-web

A web crawler for daily fetching stock data from Goodinfo!台灣股市資訊網 and CMoney 股市爆料同學會, which are either hit a historical high or at Top 50 of the trading volume.

![image](https://i.imgur.com/vrFnMPD.png)

## Link

Here is a working live link: https://stock.codetorich.com

## Technologies

- Front-End: React.js, Redux, Next.js, Less, React Suite
- Backend: Node.js, Express.js, Nest.js, TypeScript, MySQL, AWS (Elastic Beanstalk, EC2, RDS, Route53)
- Tools: Docker, ESLint, Prettier, Puppeteer, Swagger UI

## Features

- Asynchronous operation with crawling page
- Setup Cron jobs and using Puppeteer to fetch stock data every day automatically
- Only fetch stock information if it does not exist in our database
- Capture Request to abort the unnecessary request (such as images) for better efficiency
