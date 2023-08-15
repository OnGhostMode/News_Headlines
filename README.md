# News Headlines - React Native
------------------------------

>**Note**:   Author:
>**Note**:   VIVEK PS
>**Note**:   Email: vivekpsanthosh@gmail.com
>**Note**:   LinedIN: [Connect with vivek](https://www.linkedin.com/in/vivek-ps-9555b8111)

# Screens
........
   1. Dashboard screen
   2. News details screen

# Dashboard Screen
.................
This screen contains the liist of news cards. After every 10 seconds, 5 random news would be added to the top of the lists.
User can refresh the screen manually using pull to refresh or by pressing the refresh icon on the top left of the list.

   1. News cards
      ...........
      Contains the basic details of a news
      On taping the card, screen will navigate to news details screen, where the user can view the full details of that screen
      News cards except the pinned card are equiped with swipe controls
      On swiping from left, it reveals the pin to top option, on taping which pins that particular news card to top of the list

   2. Pinned cards
      ............
      Pinned card wont be removed on refreshing the data or adding random news after every 10nseconds
      Pinned cards will stay on the screen, unless it is unpinned
      To un pin a card, press on the un pin icon on the top left corner of the pinned card

# News Details Screen
....................
   This screen displays all the details available for the news, as received from API
   To view the full news in browser, tap on the open in browser icon at the bottom of the screen


# Offline Functionality
......................
All the data fetched from API are saved to local storage using AsyncStorage
On app loading, it checks for available data in local storage. If data is available, it will be populated to redux

# Redux Saga
...........
Inside the app, API calling and state management are done using redux saga
On app launching, API call is performed using saga and received data is stored in redux for seemless operations

# FAQ
....

1. How to pin a news card?
A. Swipe from the left edge of the card you want to pin.
   Pin Icon will be revealed on the left side
   Tap on the pin and your caard will be pinned to top

2. How to delete a news card?
A. To delete a news card, swipe from the right edge of the screen
   Delete icon will be revealed on the right side
   Tap on the delete button to remove the card

3. What happens on manually refreshing the list?
A. On manual refresh, API will be called again to populate the data in redux
   On successful refresh, 10 second timer for populating data in the list would be reset

4. What is 'Open in browser' option for?
A. Open in browser option is provided to naviagate to the corresponding web page of the news.
   In side the web page, the detailed news can be accessed, which is not includede in the API

5. How does offline functionality works?
A. Offline functionality uses AsyncStorage to store the data received from API to device storage.
   First time when the API returns result, it will be saved to offline. 
   This data would be overwritten on every successful API call, to keep the latest availabel data in device storage.
   When the app opens, the data stored in local storage would be retrieved and saved to redux.
   Thus in case of offline mode, this locally saved data would be populated



# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
