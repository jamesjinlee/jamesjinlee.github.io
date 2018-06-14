---
layout: project
type: project
image: images/uventure.png
title: uVenture
permalink: projects/uventure
date: 2017
labels:
  - Meteor
  - Google Maps API
  - JavaScript
  - MongoDB
summary: A Meteor web application backed by MongoDB to help the UH Manoa community plan adventures around Hawaii!
---
[uVenture](http://uventure.meteorapp.com/) is a Meteor web application backed by MongoDB to help the UH Manoa community plan adventures around Hawaii. I worked with a group of three on this project for my ICS 314 Software Engineering class. The latest deployment of this project is hosted on the Galaxy platform-as-a-service (PaaS)-- which is similar to the [Docker](https://www.docker.com/) and [Amazon Web Services](https://aws.amazon.com/) hosting environments.

<img src="/images/landing.png" width="700" height="400" class="ui huge floated rounded image">

My role for this project was to create the frontend and backend capabilities to allow users to add an adventure, edit adventures and view the currently existing adventures.
I also created the backend data for the Calendar page which populates the Calendar Page with special dates based on the UH system academic calendar.

<img src="/images/mongodb.png" width="600" height="200" class="ui huge floated rounded image">

I managed the MongoDB database hosted on [mLabs](https://mlab.com/home), a cloud-based MongoDB service which is currently free for me. 

I also played a role as the Project Manager of the team by organizing weekly meetings to ensure that everyone was on the same page and seeing the same vision for the uVenture application.
The project management methodology this project followed was the [Issue Driven Project Management (IDPM) methodology](http://courses.ics.hawaii.edu/ReviewICS314/morea/project-management/reading-project-management-guidelines.html).
IDPM prioritizes development in "sprints" called Milestones. With each Milestone, the project would progressively improve and have enhanced functionality.
This methodology was created by [Dr. Philip Johnson](philipmjohnson.org) at the University of Hawaii at Manoa.

For uVenture, I implemented the Adventure Collection which became part of the Add Adventure page. The Add Adventure page allows uVenture users to add an adventure they plan to the uVenture database. 

This Add Adventure page uses an [unofficial Meteor Google Maps API package](https://atmospherejs.com/dburles/google-maps) to generate a Google Maps view on the Add Adventure form.
<img src="/images/add.png" width="700" height="400" class="ui huge floated rounded image">

I also implemented a Find Adventure page which pulls existing Adventures from the database and generates [Semantic UI](https://semantic-ui.com) cards out of them.

If there is no adventures existing in the database, the Adventure Seed I created will autopopulate some sample adventures for users to see and edit.
<img src="/images/find.png" width="700" height="400" class="ui huge floated rounded image">

Any existing Adventure data can also be edited after hitting the "Edit" button in the Find Adventure page.

Along with the Adventure Seed, I created an Event Data Seed which populates the existing Calendar Page with special dates based on the UH system academic calendar.
<img src="/images/calendar.png" width="700" height="400" class="ui huge floated rounded image">

From this project, I learned how to work with students of different skill levels and organize them into roles that fit the best of their abilities. 
Since I was the only one with any professional software development experience in the team, I was able to combined what I learned from my past internships and my Software Engineering class to manage my team.
This project also gave me heavy exposure to working with others on Github through the IDPM set by Professor Johnson. 

Although I do not see myself using Meteor in the future, my backend experience with MongoDB in this project has given me the confidence to be able to work on a variety of different platforms while still using a NoSQL database.

If you want to learn about uVenture, please check out the project site down!

Source: <a href="https://uventure.github.io/"><i class="large github icon"></i>uVenture</a>
