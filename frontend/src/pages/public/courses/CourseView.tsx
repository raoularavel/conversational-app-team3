import {
  Button, CircularProgress, Paper, Stack,
} from '@mui/material';
import { useGetAllCoursesQuery } from '../../../apiServices/courseService';
import { useGetUserCoursesQuery } from '../../../apiServices/userService';
import TabView from '../../../components/TabView';
import { useAuth } from '../../../store/authReducer';
import CourseList from './CourseList';

function CourseView() {
  const auth = useAuth();

  const { isLoading } = useGetAllCoursesQuery();

  const { isLoading: isLoadingEnroll } = useGetUserCoursesQuery(auth.user.id);

  if (isLoading || isLoadingEnroll) { return <CircularProgress />; }

  return (
    <Stack spacing={2} width="100%">
      <TabView
        title="My Courses"
        tabs={
      [
        {
          name: 'All',
          component: <CourseList />,
        },
        {
          name: 'In Progress',
          component: (
            <Paper sx={{
              height: '300px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
            }}
            >
              <Button size="large">All Courses in progress</Button>
            </Paper>
          ),
        },
        {
          name: 'Completed',
          component: (
            <Paper sx={{
              height: '300px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
            }}
            >
              <Button size="large">All Courses completed</Button>
            </Paper>
          ),
        },
      ]
     }
      />
    </Stack>

  );
}

export default CourseView;
