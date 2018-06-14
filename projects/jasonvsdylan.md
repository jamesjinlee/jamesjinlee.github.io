---
layout: project
type: project
image: images/jasonvsdylandot.png
title: Jason vs Dylan
permalink: projects/jasonvsdylan
date: 2014
labels:
  - Java
  - EZ
  - Animation
  - Pokemon
summary: A scripted Pokemon battle animation developed in ICS 111 at the University of Hawaii at Manoa.
---
<iframe width="620" height="480" src="https://www.youtube.com/embed/EqaDmNBn5KA" frameborder="0" allowfullscreen></iframe>

Jason vs. Dylan is a Java project that creates an animation from instructions off text files. The characters were based off of my ICS 111 (Intro to Programming I) professor and teaching assistant. The graphics were implemented using [EZ](http://www2.hawaii.edu/~dylank/ics111/) library provided by ICS 111 class. From this project, I gained experience using graphics and sounds to create animations in Java.

The ``cnguyen7_animator`` class creates an [EZImage](http://www2.hawaii.edu/~dylank/ics111/doc/) object or "character" and allows it to read commands from .txt files under the convention of ``command numbervalue duration`` and translates them into functions in the EZImage class.

For example, ``move 200 100 10`` which is equivalent to ``translateTo(200,100)`` for the duration of 10 miliseconds-- which allows a "character" to move to position (200,100) within 10 miliseconds. Once the code runs, every character in the animation reads their .txt script and execute their EZ function calls. 

For more information and the code repository, please check out the Github link below! 
 
Source: <a href="https://github.com/chrisnguyenhi/JasonVSDylan"><i class="large github icon"></i>JasonVSDylan</a>
