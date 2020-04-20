import React from 'react';
import {
  TextField, InputLabel,
} from "@material-ui/core";
import { get } from 'lodash';
import { FieldArray } from 'formik';

// Types Import
import { ConfigurationType } from '@Types';

type FormBuilderProps = {
  properties: Array<{
    name: string;
    label: string;
    schema: ConfigurationType;
  }>;
  formik: {
    touched: object;
    errors: object;
    values: object;
    handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
    handleBlur: (eventOrString: any) => void | ((e: any) => void);
  };
}

function FormBuilder ({
  properties,
  formik
}: FormBuilderProps) {
  console.log('properties', properties)
  return (
    <>
      {properties.map((property, index) => {
        if (property.schema.type === 'integer') {
          return (
            <TextField
              key={index}
              margin="dense"
              id={property.name}
              name={property.name}
              label={property.label}
              type="number"
              fullWidth
              error={Boolean(
                get(formik.touched, property.name) && get(formik.errors, property.name)
              )}
              helperText={
                get(formik.touched, property.name) && get(formik.errors, property.name) ? get(formik.errors, property.name) : ""
              }
              value={get(formik.values, property.name)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          )
        } else if (property.schema.type[0] === 'array') {
          {/*return (
            <>
              <FieldArray name={property.name}>
                {arrayHelpers => (
                  <>
                    {get(formik.values, property.name, []).map((item: string, itemIndex: number) => {
                      const itemName = `${property.name}.${itemIndex}`;
                      console.log('item name', itemName)
                      return (
                        <TextField
                          key={index}
                          margin="dense"
                          id={itemName}
                          name={itemName}
                          label={property.label}
                          fullWidth
                          error={Boolean(
                            get(formik.touched, itemName) && get(formik.errors, itemName)
                          )}
                          helperText={
                            get(formik.touched, itemName) && get(formik.errors, itemName) ? get(formik.errors, itemName) : ""
                          }
                          value={item}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      )
                    })}
                  </>
                )}
              </FieldArray>
            </>
          )*/}
          return <div />
        }
      })}
    </>
  )
}

export default FormBuilder;
