import { Stack } from '@mui/material';
import { CourseType } from '../../../interfaces/CourseType';
import { useCourses, useEnrolledCourses } from '../../../store/courseReducer';
import ListItemCourse from './ListItemCourse';

function CourseList() {
  const enrolled = useEnrolledCourses();
  const courseIds = enrolled.map((e:CourseType) => e.id);
  const allCourses = useCourses() ?? [];

  const courses = allCourses.filter((c:CourseType) => courseIds.includes(c.id));

  return (

    <Stack spacing={2}>
      {courses && courses.map((course:CourseType) => (
        <ListItemCourse
          course={course}
          key={course.id}
        />
      ))}
    </Stack>
  );
}

export default CourseList;
