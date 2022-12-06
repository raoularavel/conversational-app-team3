import * as Yup from 'yup';
import Model from './Model';

class Course extends Model {
  constructor() {
    super();
    this.name = 'courses';
    this.validationSchema = Yup.object().shape({
      title: Yup.string().min(3, 'The Name must be at least 3 characters').required('Please, provide a summary.'),
      description: Yup.string().min(3),
      content: Yup.string().min(3, 'The summary must be at least 3 characters').required('Please, provide a summary.'),
    });
    this.fields = [
      {
        name: 'title',
        type: 'text',
        label: 'Course Title',
      },
      {
        name: 'description',
        label: 'Course Description',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
      {
        name: 'content',
        label: 'Course Content',
        type: 'textarea',
        multiline: true,
        rows: 4,
        required: true,
      },
    ];
    this.setInitialValues();
  }
}

export default Course;
