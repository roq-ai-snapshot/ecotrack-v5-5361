import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Sustainability Manager', 'Waste Management Officer', 'Admin', 'Employee'];
  const applicationName = 'EcoTrack v5';
  const tenantName = 'Business Organization';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Role: Business Owner

1. As a business owner, I want to be able to create an account for my organization on the platform so that I can start monitoring our environmental impact.

2. As a business owner, I want to be able to invite my team members (Sustainability Manager, Waste Management Officer, and Admin) to join the platform so that they can contribute to managing our organization's environmental data.

3. As a business owner, I want to be able to view a dashboard that shows my organization's overall carbon footprint, waste management, and sustainable practices so that I can make informed decisions about our environmental strategy.

4. As a business owner, I want to be able to set environmental goals for my organization and track our progress towards achieving them so that we can continuously improve our sustainability efforts.

5. As a business owner, I want to be able to generate reports on our organization's environmental performance so that I can share this information with stakeholders and regulatory bodies.

Role: Sustainability Manager

1. As a sustainability manager, I want to be able to input and update data related to our organization's carbon emissions, energy consumption, and other environmental factors so that we can accurately track our environmental impact.

2. As a sustainability manager, I want to be able to identify areas where our organization can improve its sustainability practices and create action plans to address these issues.

3. As a sustainability manager, I want to be able to collaborate with the waste management officer and admin to ensure that our organization's environmental data is accurate and up-to-date.

4. As a sustainability manager, I want to be able to monitor our organization's progress towards achieving our environmental goals and make recommendations for adjustments as needed.

Role: Waste Management Officer

1. As a waste management officer, I want to be able to input and update data related to our organization's waste generation, disposal, and recycling practices so that we can accurately track our waste management efforts.

2. As a waste management officer, I want to be able to identify opportunities for improving our organization's waste management practices and create action plans to address these issues.

3. As a waste management officer, I want to be able to collaborate with the sustainability manager and admin to ensure that our organization's waste management data is accurate and up-to-date.

Role: Admin

1. As an admin, I want to be able to manage user accounts and permissions for our organization's team members on the platform so that the right people have access to the appropriate data and tools.

2. As an admin, I want to be able to configure the platform's settings to match our organization's specific needs and preferences so that we can effectively use the platform to manage our environmental data.

3. As an admin, I want to be able to assist the sustainability manager and waste management officer in ensuring that our organization's environmental data is accurate and up-to-date.

Role: Employee (not a member of the Business Organization)

1. As an employee, I want to be able to access information about my employer's environmental performance and sustainability initiatives so that I can understand the impact of my workplace on the environment.

2. As an employee, I want to be able to provide feedback and suggestions for improving my employer's sustainability practices so that I can contribute to making my workplace more environmentally friendly.

3. As an employee, I want to be able to participate in company-wide sustainability initiatives and track my personal contributions to these efforts so that I can feel engaged and motivated to help my employer reduce its environmental impact.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
