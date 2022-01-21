# Data Import

**Source:** https://www.kaggle.com/rounakbanik/the-movies-dataset

## Importing to Neo4j

This data can be imported using a combination of `LOAD CSV` in Cypher and APOC.

Either copy the CSV files into the `import/` folder inside Neo4j's home folder, or set the `dbms.directories.import` setting in `neo4j.conf` to this folder.  For example:

```conf
# neo4j.conf
dbms.directories.import=/path/to/project/data
```

Then you can use LOAD CSV to explore and load the data:

```cypher
LOAD CSV WITH HEADERS FROM 'file:///movies_metadata.csv' AS row
RETURN row LIMIT 1
```

```json
{
  "overview": "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
  "original_language": "en",
  "original_title": "Toy Story",
  "imdb_id": "tt0114709",
  "runtime": "81.0",
  "video": "False",
  "title": "Toy Story",
  "poster_path": "/rhIRbceoE9lR4veEXuwCC2wARtG.jpg",
  "spoken_languages": "[{'iso_639_1': 'en', 'name': 'English'}]",
  "revenue": "373554033",
  "release_date": "1995-10-30",
  "production_companies": "[{'name': 'Pixar Animation Studios', 'id': 3}]",
  "genres": "[{'id': 16, 'name': 'Animation'}, {'id': 35, 'name': 'Comedy'}, {'id': 10751, 'name': 'Family'}]",
  "popularity": "21.946943",
  "vote_average": "7.7",
  "belongs_to_collection": "{'id': 10194, 'name': 'Toy Story Collection', 'poster_path': '/7G9915LfUQ2lVfwMEEhDsn3kT4B.jpg', 'backdrop_path': '/9FBwqcd9IRruEDUrTdcaafOMKUq.jpg'}",
  "production_countries": "[{'iso_3166_1': 'US', 'name': 'United States of America'}]",
  "tagline": null,
  "id": "862",
  "adult": "False",
  "vote_count": "5415",
  "status": "Released",
  "homepage": "http://toystory.disney.com/toy-story",
  "budget": "30000000"
}
```

## Import Scripts

If you don't want to write your own, the [load.cypher](./load.cypher) file contains Cypher statements for creating constraints and loading the data into Neo4j.
