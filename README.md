# To-Do List

Y Paul Sussman: March 24th, 2017; Version 1.0

## Application Overview

This was my first from-scratch full-stack application: it connects to a local PostgreSQL database.

## Getting Started

Fork, clone, or download the project, then run `npm install`.

You'll also need to have [PostgreSQL downloaded](https://www.postgresql.org/download/macosx/), then set up the database and table by copying and running the contents of `database.sql`. (_For this, you can either use the terminal or a client like_ [Postico](https://eggerapps.at/postico/).)

## Built With

* HTML 5, CSS 3, Bootstrap, and jQuery;
* Node.js, Express.js, and PG; and
* PostgreSQL.

## Learning Value
Writing this app was fairly straightforward, but the major learning experience came a few weeks after completion. I'd begun experimenting with Heroku deployments, using mLab for my MongoDB remotes, and thought to  replicate that process with a similar service on the PostgreSQL side.

Heroku has its native PostgreSQL hosting service, but I'd wanted to try something farther afield, so I went with [ElephantSQL](https://www.elephantsql.com). The product they make is undoubtably worthwhile: but with documentation designed for an experienced admin (_as opposed to, well, March-Y-Paul_), it was unable to guide me through the process of connection. (_In retrospect, the issue was ~3 minutes of setting up environmental variables; I simply didn't know at the time where to add them, or even how to_ learn _where to add them._) Such began my healthy respect for the practice (_and trials_) of DevOps...

## Demo
<p align="center">
  <img src="To-Do_List.gif" alt="walkthrough gif"/>
</p>
