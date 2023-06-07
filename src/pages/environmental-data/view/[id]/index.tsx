import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getEnvironmentalDataById } from 'apiSdk/environmental-data';
import { Error } from 'components/error';
import { EnvironmentalDataInterface } from 'interfaces/environmental-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function EnvironmentalDataViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EnvironmentalDataInterface>(
    () => (id ? `/environmental-data/${id}` : null),
    () =>
      getEnvironmentalDataById(id, {
        relations: ['business_organization'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Environmental Data Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Carbon Footprint:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.carbon_footprint}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Energy Consumption:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.energy_consumption}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Waste Generation:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.waste_generation}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Recycling Rate:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.recycling_rate}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Created At:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.created_at as unknown as string}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Updated At:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.updated_at as unknown as string}
            </Text>
            <br />
            {hasAccess('business_organization', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Business Organization:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/business-organizations/view/${data?.business_organization?.id}`}>
                    {data?.business_organization?.name}
                  </Link>
                </Text>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'environmental_data',
  operation: AccessOperationEnum.READ,
})(EnvironmentalDataViewPage);
