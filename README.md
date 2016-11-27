# Live Validator
[![Build Status](https://travis-ci.org/chesedo/LiveValidator.svg?branch=master)](https://travis-ci.org/chesedo/LiveValidator)
[![Coverage Status](https://coveralls.io/repos/github/chesedo/LiveValidator/badge.svg?branch=master)](https://coveralls.io/github/chesedo/LiveValidator?branch=master)

This jquery plugin is a complete re-write of its predecessor [jQuery-liveVal](https://github.com/chesedo/jQuery-liveVal). It is now theme-able (major frameworks to be added soon) and it is easier to extend the checks. And finally, the entire code is unit tested.

The core of the plugin is also pure JS, so no need to use jQuery if you do not want to.

The following is still needed before it will be considered usable:
- [ ] Create GitHub page
- [x] Add Bootstrap theme - also added some other themes
- [x] Write test for Tester
- [x] Auto-detect checkers needed for input attributes such as `min`, `max`, `maxlength`, etc.
