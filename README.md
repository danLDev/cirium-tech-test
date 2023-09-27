# Cirium Tech Test

This project contains some basic classes required to simulate a flight travelling along a pre-determined route. Exposing class members to calculate the current (estimated/pre-planned) location of a flight, and ascertain whether it is/will pass through a given airspace.

## Assumptions

### Speed of flight:

This code assumes that the aircraft will travel at a constant speed throughout the entire flight (For this I have used the crusing speed of a 737): While this is not true to life, it allows for a far simpler calculation of the current flight location (and subsequent intersects).

In order to overcome this, we would need to extend the `FlightPathSegment` type to include a velocity/speed parameter, indicating the expected duration of each segment/leg of a flight.

### External factors:

We also assume that there are no other external factors which may delay a flight once in the air, in order to take a total duration calculation of the flight, and move this forward/backward in time to account for delays.

### Floating point calculation accuracy

Being native Javascript, there are flaws in floating point calculations. For the sake of simplicity I have not addressed these, however we do run into some innacuracies when calculating distance. If an end solution was to be written in JS/TS, then something like [DecimalJS](https://github.com/MikeMcl/decimal.js) would be needed to ensure precision.

## Improvements

As stated above there are a few compromises which need to be made in order to simulate a flight without the use of real world data. In an ideal world we would need a few more data points to accurately calculate the location/time.

In order to acheive a complete solution, we would need to know the tail number of the aircraft. With this we would be able to find the last known transponder location of the flight. From which we could see if the flight was ahead/behind schedule, as well as know the progress along the planned route and current/upcoming intersects.
