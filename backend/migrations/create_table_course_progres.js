export const courseProgress = `CREATE TABLE IF NOT EXISTS course_progress (
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    progres_value INT DEFAULT 0,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);`;
