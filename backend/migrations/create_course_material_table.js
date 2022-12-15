export const courseMaterial = `CREATE TABLE IF NOT EXISTS course_materials (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    path VARCHAR,
    type VARCHAR,
    course_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);`;