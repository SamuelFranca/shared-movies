MATCH (p:Package)
WITH collect(p) AS Plans
CALL apoc.refactor.rename.label("Package", "Plan", Plans)
YIELD committedOperations
RETURN committedOperations