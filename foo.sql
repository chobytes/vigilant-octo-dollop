-- bus stop that appears on the most bus routes
select routes_stops.stop_id, os.name, cs.name, count(routes_stops.route_id)
from routes_stops
inner join stops on routes_stops.stop_id = stops.id
inner join streets as os on stops.on_id = os.id
inner join streets as cs on stops.cross_id = cs.id
group by stop_id, os.name, cs.name
order by count(routes_stops.route_id) desc
limit 30;

-- bus route with most stop s
select routes_stops.route_id, routes.name, count(routes_stops.stop_id)
from routes_stops
inner join routes on routes_stops.route_id = routes.id
group by routes_stops.route_id, routes.name
order by count(routes_stops.stop_id) desc
limit 30;

--
-- views
--

-- denormalized
create view denormalized as
select
      stp.id as stop_id
    , os.name as on_street
    , cs.name as cross_street
    , rt.name as route_name
    , rdr.boardings as boardings
    , rdr.departures as alightings
    , tp.date as month_beginning
    , stp.location as location
from
    stops as stp
    inner join streets as os
          on stp.on_id = os.id
    inner join streets as cs
          on stp.cross_id = cs.id
    inner join routes_stops as rs
          on stp.id = rs.stop_id
    inner join routes as rt
          on rs.route_id = rt.id
    inner join ridership as rdr
          on stp.id = rdr.stop_id
    inner join time_periods as tp
          on rdr.time_id = tp.id
;


-- count bus stops_on_routes
create view count_stops_on_routes as
select
    rs.route_id,
    r.name,
    count(rs.stop_id)
from
    routes_stops as rs
    inner join routes as r on rs.route_id = r.id
group by
      rs.route_id,
      r.name;

-- bus stop with most routes
create view count_routes_serving_stops as
select
    rs.stop_id,
    os.name as on_street_name,
    cs.name as cross_street_name,
    count(rs.route_id) as number_of_routes
from
    routes_stops as rs
    inner join stops as stp on rs.stop_id = stp.id
    inner join streets as os on stp.on_id = os.id
    inner join streets as cs on stp.cross_id = cs.id
group by
      rs.stop_id,
      os.name, cs.name;


