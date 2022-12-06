import { Button, Paper, Stack } from '@mui/material';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import { useCreateUserMutation } from '../../../apiServices/userService';
import FormBuilder from '../../../components/forms/FormBuilder';
import { CreateUserRequest } from '../../../interfaces/UserType';
import User from '../../../models/User';
import { closeDialog, openDialog } from '../../../store/dialogFormReducer';

type Props = {
  title: string
};

export default function CreateUserForm({ title = 'Add new user' } : Props) {
  const model = new User();
  const dispatch = useDispatch();
  const openForm = () => dispatch(openDialog());
  const onCancel = () => dispatch(closeDialog());
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (values:FormikValues) => {
    const user = { ...values, role: model.data.role.indexOf(values.role) } as CreateUserRequest;
    await createUser(user).unwrap();
    onCancel();
  };
  return (
    <Paper
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: 'common.background',
        p: 2,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <FormBuilder
          title={title}
          dialog
          model={model}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
        <Button size="large" onClick={openForm}>{title}</Button>
      </Stack>
    </Paper>
  );
}
