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
    <Formik
      enableReinitialize
      initialValues={{ options: options.map(entry => entry.option) }}
      key={questionId}
    >
      {() => (
        <FormikForm>
          <div className="mt-4 flex flex-col gap-4">
            <FieldArray name="options">
              {() =>
                options?.map((option, index) => (
                  <Option
                    isDisabled
                    key={option.id}
                    number={index + 1}
                    style={
                      isOptionInAnswers(questionId, option.id) ? "correct" : ""
                    }
                    onSelectCorrect={() =>
                      onOptionSelect(questionId, option.id)
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
