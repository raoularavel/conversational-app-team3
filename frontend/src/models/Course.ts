import * as Yup from 'yup';
import Model from './Model';

class Course extends Model {
  constructor() {
    super();
    this.name = 'courses';
    this.validationSchema = Yup.object().shape({
      name: Yup.string().min(3, 'The Name must be at least 3 characters').required('Please, provide a summary.'),
      thumbnail: Yup.string().min(3),
      summary: Yup.string().min(3, 'The summary must be at least 3 characters').required('Please, provide a summary.'),
      description: Yup.string().min(3),
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
      {
        name: 'matetial',
        label: 'Course Materials',
        type: 'file',
        multiple: true,
      },
    ];
    this.setInitialValues();
  }
}

export default Course;
