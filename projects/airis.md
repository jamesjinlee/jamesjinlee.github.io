---
layout: project
type: project
image: images/airisdot.png
title: AIRIS
permalink: projects/airis
date: 2015
labels:
  - C++
  - OpenCV
  - Computer Vision
  - DOE STEM
summary: A console application that uses OpenCV to track motion in real-time. This project was done for the 2016 Honolulu District and Hawaii State Science and Engineering Fair where I served as a STEM Resource Mentor.
---
<img class class="ui medium right floated rounded image" src="../images/airisdot.png">

AIRIS is a C++ console application using the [OpenCV](http://opencv.org/) Computer Vision library to track motion in real time through a live-video feed through a camera or a normal video file. This project was a collaborative effort for me a STEM Resource Mentor for the Hawaii State Deparment of Education's [Kaimuki-McKinley-Roosevelt Complex Area](http://www.hawaiipublicschools.org/ConnectWithUs/Organization/OfficesAndBranches/Pages/Kaimuki-McKinley-Roosevelt.aspx).

As a mentor, I was tasked with teaching two high school students how to code in C++ and use the OpenCV library for this project. For the programming side, I constructed the basic framework to track motion using the concept of [image differencing](https://en.wikipedia.org/wiki/Image_differencing) and used a Windows grid display app for validation during data collection.

To achieve real-time motion detection, AIRIS uses the concept of image differencing in which the current frame is compared to the previous frame. If the current frame is different from the previous frame then there is indeed movement. 
<img src="../images/airispic.png">

This project won Best of Systems Software at the 2016 Honolulu District Science and Engineering Fair and was nomimated to attend the Intel Science and Engineering Fair. After the 2016 Honolulu District Science and Engineering Fair, I worked with my mentees to apply this image differencing algorithm to leukemia detection for the 2016 Hawaii State Science and Engineering Fair-- which resulted in this project receiving the University of Hawaii at Manoa Department of Information and Computer Sciences Award and 3rd Prize in Systems Software.

For this project, I learned how to research advanced topics such as Computer Vision and apply theory to code. This project also gave me the opportunity to improve my ability to teach C++ to students with no programming knowledge and work with a different age group. Learning well enough to teach others has always been a "mantra" of mine and by doing so, I became a better programmer. I definitely believe that high school students are capable of learning Computer Science. 

<br>
<img class class="ui medium left floated rounded image" src="../images/airisgroup.jpg">
<br>
<br>

This project and my mentees were also featured on Hawaii News Now on Sunrise for the [March 11](http://www.hawaiinewsnow.com/story/31448254/students-discuss-their-entries-in-the-hawaii-state-science-and-engineer-fair) airing and the [March 22](http://www.hawaiinewsnow.com/story/31539501/interview-hawaii-state-science-engineering-fair) airing. 

If you want to learn more about this project, please check out this Github link below! 

Source: <a href="https://github.com/chrisnguyenhi/airis"><i class="large github icon"></i>AIRIS</a>
