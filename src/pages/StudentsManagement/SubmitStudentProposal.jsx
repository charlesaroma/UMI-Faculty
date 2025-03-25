import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  description: Yup.string(),
  submissionDate: Yup.date()
    .required('Submission date is required'),
  researchArea: Yup.string()
    .required('Research area is required'),
  file: Yup.mixed()
    .test('fileSize', 'File size must be less than 500MB', value => {
      if (!value) return true;
      return value.size <= 500 * 1024 * 1024;
    })
});

const SubmitStudentProposal = () => {
  const { id } = useParams();

  const initialValues = {
    title: '',
    description: '',
    file: null,
    submissionDate: '',
    researchArea: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Submitting proposal:', values);
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Submit Research Proposal</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="submissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Submission Date
                  </label>
                  <Field
                    type="date"
                    id="submissionDate"
                    name="submissionDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.submissionDate && touched.submissionDate && (
                    <div className="text-red-500 text-sm mt-1">{errors.submissionDate}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="researchArea" className="block text-sm font-medium text-gray-700 mb-1">
                    Research Area
                  </label>
                  <Field
                    type="text"
                    id="researchArea"
                    name="researchArea"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.researchArea && touched.researchArea && (
                    <div className="text-red-500 text-sm mt-1">{errors.researchArea}</div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Proposal Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Proposal Abstract (Optional)
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.description && touched.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>

              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Proposal Document
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  accept=".pdf,.doc,.docx"
                />
                {errors.file && touched.file && (
                  <div className="text-red-500 text-sm mt-1">{errors.file}</div>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX (Max size: 500MB)
                </p>
                {errors.file && touched.file && (
                    <div className="text-red-500 text-sm mt-1">{errors.file}</div>
                  )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#23388F] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubmitStudentProposal;