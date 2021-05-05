# HSLDemo

![Azure build pipeline status](https://vsrm.dev.azure.com/petrituononen77/_apis/public/Release/badge/96f7b067-f8e5-4616-b0b4-073f5c28e157/1/1)

Hosted on Azure: https://hsldemoapp.azurewebsites.net

## Summary
Technical demonstration of using HSL (Helsinki Regional Transport Authority) APIs for map tiles and address search.

## Features
 * Locate address or a place on a map 
   * Pins are added to the map that match search criteria and max results option
   * Best match (first on the list) is automatically highlighted and zoomed in after search
 * Map zooms to the result that is clicked (on the result list). Result and pin are highlighted
 * Error is shown if search result did not contain matches. Also all pins and search results are removed and zoom out happens
 * Possibility to hide search results and show them again. Great for mobile phones with less screen area
 * Option to set max results count and type of searched keyword

## Technology
 * ReactJS frontend
 * .NET 5 backend (not needed as of yet)

## Development

### Starting the frontend app

Install NodeJs and npm and run the following commands on command prompt
  cd HSLDemo/ClientApp
  npm install
  npm run build
  npm start
