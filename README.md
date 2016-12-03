# studious-display
A front-end that displays processed information for the Logro project. Other analytics are also shown in the form of data visualizations.

# History
This is the User Interface to display results of the _Logro_ project.

The purpose of _Logro_, and by association 'studious-display', is to allow other people and myself to become more skeptical about our own emotions. There is a concept of an activity, experience, and log hierarchy. Every experience is the intersection of two activities, and every experience can have a set of logs. An activity can also be associated with any number of experiences.

# Goals
After users interact and utilize 'log-grower', a project that creates raw data, 'studious-display' is meant to show that information in a a friendly and inviting way. By this process, the user should be able to have more introspective tools available to them.

Every human needs to fulfill certain basic needs before they are able to deeply reflect on their own. In other words, self-actualization in humans tends to occur stigmergically. This self-actualization can be stifled when humans have their attention overly-focused on daily physical, emotional , analytical, cultural, ethereal tasks. Examples of these tasks are...
* Running, gardening, singing, painting.
* Talking, smiling, hugging, helping.
* Learning, reading, focussing, thinking.
* Advocating, changing, participating, making.
* Believing, dreaming, mediating, meditating.

# Tech Stack
Instead of building visualization capabilities into the 'log-grower' application, I decided to create a separate project with makes use of the quicker response time of react.js on the view. This project also makes use of the flux architecture, specifically that of redux. It relies on communication through the 'fixed-gateway' for authentication. Ultimately, data is retrieved from 'hungry-interceptor'.

# Getting Started
Install all node dependencies:
```
npm install
```

After installing dependencies, run this command in a terminal to start the project:
```
npm start
```
A server is now running at: http://localhost:3001

# License
GPLv3
