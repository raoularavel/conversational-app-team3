import {
  Box, Divider, ListItem, ListItemText, Stack,
} from '@mui/material';
import { useGetCourseMaterialsQuery } from '../../../apiServices/courseService';
import Loader from '../../../components/Loader';
import { CourseType } from '../../../interfaces/CourseType';
import EmptyView from '../../errors/EmptyView';

type Props = {
  course: CourseType
};

export default function CourseMaterial({ course } : Required<Props>) {
  const { data, isLoading } = useGetCourseMaterialsQuery(course.id);

  if (isLoading) return <Loader />;

  const materials = data?.data.materials;

  if (!materials) return <EmptyView title="Course Materials not found" code={404} />;

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {materials.map((material) => (
        <Box key={material.id}>
          <ListItem>
            <ListItemText>{material.name}</ListItemText>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </Stack>
  );
}
