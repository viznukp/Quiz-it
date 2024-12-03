import React from "react";

import { Form as FormikForm, Formik, FieldArray } from "formik";
import { Typography } from "neetoui";

import { Option } from "components/commons";

const ShowQuestion = ({
  questionId,
  question,
  options,
  onOptionSelect,
  isOptionInAnswers,
}) => (
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
                    key={index}
                    number={index + 1}
                    style={
                      isOptionInAnswers(questionId, index + 1) ? "correct" : ""
                    }
                    onSelectCorrect={() =>
                      onOptionSelect(questionId, index + 1)
                    }
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
