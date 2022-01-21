CREATE CONSTRAINT ON (n:Movie) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Language) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Country) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Genre) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:ProductionCompany) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Collection) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Person) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:User) ASSERT n.id IS UNIQUE;
CREATE CONSTRAINT ON (n:Keyword) ASSERT n.id IS UNIQUE;

CREATE CONSTRAINT ON (u:User) ASSERT u.email IS UNIQUE;
// CREATE CONSTRAINT ON (u:User) ASSERT exists(u.email);

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
SET m += row {
    .overview,
    .imdb_id,
    .title,
    .poster_path,
    .backdrop_path,
    .original_title,
    .original_language,
    .tagline,
    .status,
    .homepage,
    runtime: toFloat(row.runtime),
    release_date: date(row.release_date),
    revenue: toFloat(row.revenue),
    popularity: toFloat(row.popularity),
    average_vote: toFloat(row.vote_average),
    vote_count: toInteger(row.vote_count),
    budget: toInteger(row.budget)
}

//Added 45433 labels, created 45433 nodes, set 772841 properties, completed after 2874 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (_ IN CASE WHEN row.original_language IS NOT NULL THEN [1] ELSE [] END |
    MERGE (l:Language {id: row.original_language})
    MERGE (m)-[:ORIGINAL_LANGUAGE]->(l)
)

//Added 89 labels, created 178 nodes, set 89 properties, created 89 relationships, completed after 2389 ms.
//Created 45422 relationships, completed after 2184 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (_ IN CASE WHEN row.video = 'True' THEN [1] ELSE [] END | SET m:Video )
FOREACH (_ IN CASE WHEN row.adult = 'True' THEN [1] ELSE [] END | SET m:Adult )
//Added 102 labels, completed after 1195 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (language IN apoc.convert.fromJsonList(row.spoken_languages) |
    MERGE (l:Language {id: language.iso_639_1}) ON CREATE SET l.name = language.name
    MERGE (m)-[:SPOKEN_IN_LANGUAGE]->(l)
)
//Added 44 labels, created 44 nodes, set 88 properties, created 53266 relationships, completed after 2840 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (country IN apoc.convert.fromJsonList(row.production_countries) |
    MERGE (c:Country {id: country.iso_3166_1}) ON CREATE SET c.name = country.name
    MERGE (m)-[:PRODUCED_IN_COUNTRY]->(c)
)
//Added 161 labels, created 161 nodes, set 322 properties, created 49368 relationships, completed after 1927 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (genre IN apoc.convert.fromJsonList(row.genres) |
    MERGE (g:Genre {id: genre.id}) ON CREATE SET g.name = genre.name
    MERGE (m)-[:IN_GENRE]->(g)
)
//Added 20 labels, created 20 nodes, set 40 properties, created 91015 relationships, completed after 2596 ms.

:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (company IN apoc.convert.fromJsonList(replace(row.production_companies,'\\','') |
    MERGE (c:ProductionCompany {id: company.id}) ON CREATE SET c.name = company.name
    MERGE (m)-[:PRODUCED_BY]->(c)
)
//Neo.ClientError.Procedure.ProcedureCallFailed
//Failed to invoke function `apoc.convert.fromJsonList`: Caused by: com.fasterxml.jackson.core.JsonParseException: 
//Unexpected character ('i' (code 105)): was expecting comma to separate Object entries
// at [Source: (String)"[{'name': 'Underground Films\', 'id': 7324}]"; line: 1, column: 35]
//"[{'name': 'Underground Films\\', 'id': 7324}]" remove \\
//replace($original, $search, $replacement)
//Replace all occurrences of search with replacement. All arguments must be expressions.


:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
with linenumber() AS number,  row where toInteger(row.id) > 0
MERGE (m:Movie {id: toInteger(row.id)})
FOREACH (collection IN CASE WHEN apoc.convert.fromJsonMap(replace(row.belongs_to_collection,': None',': \'None\'')) IS NOT NULL THEN [apoc.convert.fromJsonMap(replace(row.belongs_to_collection,': None',': \'None\''))] ELSE [] END |
    MERGE (c:Collection {id: collection.id}) ON CREATE SET c += collection
    MERGE (m)-[:IN_COLLECTION]->(c)
);

//Neo.ClientError.Procedure.ProcedureCallFailed
//Failed to invoke function `apoc.convert.fromJsonMap`: 
//Caused by: com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'None': was expecting (JSON String, Number (or 'NaN'/'INF'/'+INF'), Array, Object or token 'null', 'true' or 'false')
// at [Source: (String)"{'id': 122017, 'name': 'Screamers Collection', 'poster_path': '/vtCuIaQvK3IyLENmuc73RFm4TU7.jpg', 'backdrop_path': None}"; line: 1, column: 120]
//: None --> : 'None'
//replace($original, $search, $replacement)
//Replace all occurrences of search with replacement. All arguments must be expressions.

// credits
:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///credits.csv' AS row

MATCH (m:Movie { id: toInteger(row.id) })

FOREACH (cast IN apoc.convert.fromJsonList(replace(row.cast,': None',': \'None\'') |
    MERGE (p:Person { id: toInteger(cast.id) })
    ON CREATE SET p.name = cast.name, p.gender = cast.gender, p.profile_path = cast.profile_path

    MERGE (p)-[r:CAST_FOR]->(m)
    ON CREATE SET r += cast {
        .credit_id,
        .cast_id,
        .character,
        .order
    }
)

FOREACH (crew IN apoc.convert.fromJsonList(replace(row.crew,': None',': \'None\'') |
    MERGE (p:Person { id: toInteger(crew.id) })
    ON CREATE SET p.name = crew.name, p.gender = crew.gender, p.profile_path = crew.profile_path

    MERGE (p)-[r:CREW_FOR]->(m)
    ON CREATE SET r += crew {
        .credit_id,
        .department,
        .job
    }
);

//Neo.ClientError.Procedure.ProcedureCallFailed
//Failed to invoke function `apoc.convert.fromJsonList`: 
//Caused by: com.fasterxml.jackson.core.JsonParseException: Unrecognized token 'None': was expecting (JSON String, Number (or 'NaN'/'INF'/'+INF'), Array, Object or token 'null', 'true' or 'false')
// at [Source: (String)"[{'cast_id': 14, 'character': 'Woody (voice)', 'credit_id': '52fe4284c3a36847f8024f95', 'gender': 2, 'id': 31, 'name': 'Tom Hanks', 'order': 0, 
//'profile_path': '/pQFoyx7rp09CJTAb932F2g8Nlho.jpg'}, {'cast_id': 15, 'character': 'Buzz Lightyear (voice)', 'credit_id': '52fe4284c3a36847f8024f99', 'gender': 2, 
//'id': 12898, 'name': 'Tim Allen', 'order': 1, 'profile_path': '/uX2xVf6pMmPepxnvFWyBtjexzgY.jpg'}, {'cast_id': 16, 'character': 'Mr. Potato Head (voice)', 
//'credit_id': '52fe4284c3a36847f8024f9d'"[truncated 2132 chars]; line: 1, column: 2420]
//: None --> : 'None'
//replace($original, $search, $replacement)
//Replace all occurrences of search with replacement. All arguments must be expressions.


// todo: specific relationship types for crew


// keywords
:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///keywords.csv' AS row
MATCH (m:Movie { id: toInteger(row.id) })

FOREACH (keyword IN apoc.convert.fromJsonList(row.keywords) |
    MERGE (k:Keyword {id: keyword.id})
    ON CREATE SET k.name = keyword.name

    MERGE (m)-[:HAS_KEYWORD]->(k)
);
//ok

// ratings_small.csv
:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///ratings_small.csv' AS row
MATCH (m:Movie { id: toInteger(row.movieId) })
MERGE (u:User { id: toInteger(row.userId) })

MERGE (u)-[r:RATED]->(m)
ON CREATE SET r.rating = toFloat(row.rating), r.timestamp = datetime({epochSeconds: toInteger(row.timestamp)});
//Neo.TransientError.Transaction.MaximumTransactionLimitReached
//Unable to start new transaction since limit of concurrently executed transactions is reached. See setting dbms.transaction.concurrent.maximum

// ratings.csv
:auto USING PERIODIC COMMIT 1000
LOAD CSV WITH HEADERS FROM 'file:///ratings.csv' AS row
MATCH (m:Movie { id: toInteger(row.movieId) })
MERGE (u:User { id: toInteger(row.userId) })

MERGE (u)-[r:RATED]->(m)
ON CREATE SET r.rating = toFloat(row.rating), r.timestamp = datetime({epochSeconds: toInteger(row.timestamp)});

// add to the database settings (config file)
//dbms.transaction.concurrent.maximum=100000
//Added 257719 labels, created 257719 nodes, set 22415419 properties, created 11078850 relationships, completed after 730743 ms.


// links (useless)