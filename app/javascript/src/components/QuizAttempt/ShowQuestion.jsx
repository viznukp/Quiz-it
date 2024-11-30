import React from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Typography } from "neetoui";

import { Option } from "components/commons";

const ShowQuestion = ({ question, options }) => (
  <>
    <Typography style="h3">{question} </Typography>
    <Formik initialValues={{ options }}>
      {({ values }) => (
        <FormikForm>
          <div className="mt-4 flex flex-col gap-4">
            <FieldArray name="options">
              {() =>
                values?.options?.map((_, index) => (
                  <Option
                    isDisabled
                    deleteSelf={() => {}}
                    key={index}
                    number={index + 1}
                  />
                ))
              }
            </FieldArray>
          </div>
        </FormikForm>
      )}
    </Formik>
  </>
);

export default ShowQuestion;
