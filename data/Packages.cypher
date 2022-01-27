create CONSTRAINT ON (p:Package) ASSERT p.id is unique;
create CONSTRAINT ON (s:Subscription) ASSERT s.id is unique;

Load CSV with headers from 'file:///packages.csv' as row

Merge (p:Package {id:toInteger(row.id)})
Set p.name = row.name,
p.duartion = duration('p' + row.days + 'D'),
p.price = toFloat(row.price)

Foreach (name in split(row.genres, '|')|
merge (g:Genre {name: name})
merge (p)-[:PROVIDES_ACCESS_TO]->(g)
) 

RETURN *;

match (p:ProductionCompany)<-[:PRODUCED_BY]-(m)-[:IN_GENRE]->(g)
with p,collect(g.name) as genres, count(distinct m) as movieCount
where none( g in genres where g in split("Animation|Comedy|Family|Adventure|Fantasy|Romance|Drama|Action|Crime|Thriller|Horror","|"))
return * limit 10;

match (p:Package {id:2})
match (c:ProductionCompany) where c.id in [12911, 93174, 83201]
create (p)-[:PROVIDES_ACCESS_TO]->(c);

match (p:Package {id: 2})
create (u:User {id:'test', email:'test.user@samuelfranca.pt',firstName: 'Test', lastName : 'User'})
create (u)-[:HAS_SUBSCRIPTION]->(s:Subscription {id:'test', expiresAt: datetime() + duration('P2D')})-[:FOR_PACKAGE]->(p)
RETURN *;

// Clean remove a empty node
MATCH (s)
WHERE ID(s) = 357115
detach delete s

match( u:User {id: "test"})-[:HAS_SUBSCRIPTION]->(s)-[:FOR_PACKAGE]->(p)
where s.expiresAt >= datetime()
match (m:Movie)
With u,s,p,m ORDER BY rand() Limit 10
return 
m.id,
m.title,
exists((m)-[:IN_GENRE|PRODUCED_BY]->()<-[:PROVIDES_ACCESS_TO]-(p))


create (p:Package {id:0, name: " Free Trial", price: 0.0, days:30 })
with p
Match (g:Genre)
Create (p)-[:PROVIDES_ACCESS_TO]->(g)

MATCH(p:Package {id:0})
return size((p)-[:PROVIDES_ACCESS_TO]->())
// 20 