# okra-scraper

#####This node application scrapes a banks web-page and saves the data scraped to a mongodb database

####Prerequisites
- mongodb installation
- nodejs(v17.6.0)

###Steps to test it out

1. Clone the repository
``https://github.com/katunold/okra-scraper.git``
2. Open the code in your preferred text-editor
3. Create a `.env` file and add a link to your mongodb or a link to your atlas cluster
``mongo_url=mongodb://localhost:27017/<your_db>``
4. Install the dependencies 
``npm i``
5. Run the application``npm start`` and wait for the script to complete
6. Feel free to check your database for scraped data

That's it! feel free to play around with the codebase 😎