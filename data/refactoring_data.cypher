MATCH (p:Package)
WITH collect(p) AS Plans
CALL apoc.refactor.rename.label("Package", "Plan", Plans)
YIELD committedOperations
RETURN committedOperations


CREATE (u:User {
email:"samuelfranca2@gmail.com",
password:"test1",
dateOfBirth: datetime("2005-06-01T18:40:32.142+0100"),
firstName: "Samuel",
lastName: "França"
} ) 
RETURN u


match (u:User {firstName: 'Samuel'})
merge [ (u)-[:PURCHASED]->(s)-[:FOR_PLAN]->(p) 
//WHERE s.expiresAt > datetime() AND s.status = "active" 
//| {subscription: s, plan: p}][0] As subscription