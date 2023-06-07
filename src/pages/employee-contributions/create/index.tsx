import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createEmployeeContribution } from 'apiSdk/employee-contributions';
import { Error } from 'components/error';
import { employeeContributionValidationSchema } from 'validationSchema/employee-contributions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ActionPlanInterface } from 'interfaces/action-plan';
import { getUsers } from 'apiSdk/users';
import { getActionPlans } from 'apiSdk/action-plans';
import { EmployeeContributionInterface } from 'interfaces/employee-contribution';

function EmployeeContributionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmployeeContributionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmployeeContribution(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeContributionInterface>({
    initialValues: {
      contribution_value: 0,
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      employee_id: (router.query.employee_id as string) ?? null,
      action_plan_id: (router.query.action_plan_id as string) ?? null,
    },
    validationSchema: employeeContributionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Employee Contribution
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="contribution_value" mb="4" isInvalid={!!formik.errors?.contribution_value}>
            <FormLabel>Contribution Value</FormLabel>
            <NumberInput
              name="contribution_value"
              value={formik.values?.contribution_value}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('contribution_value', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.contribution_value && (
              <FormErrorMessage>{formik.errors?.contribution_value}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<ActionPlanInterface>
            formik={formik}
            name={'action_plan_id'}
            label={'Select Action Plan'}
            placeholder={'Select Action Plan'}
            fetcher={getActionPlans}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'employee_contribution',
  operation: AccessOperationEnum.CREATE,
})(EmployeeContributionCreatePage);
