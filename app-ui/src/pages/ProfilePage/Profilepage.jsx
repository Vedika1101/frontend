import React, { useContext, useEffect, useState } from 'react';
import { Box, Avatar, Heading, Text, Stack, Button, SimpleGrid, Spinner } from '@chakra-ui/react';
import { MyContext } from '../../context/Context';
import axios from 'axios';
import GigCard from '../myGigs/MyGigs';

function Profilepage() {
  const { userInfo, setUserInfo } = useContext(MyContext);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      if (data) {
        setUserInfo(data);
      }
    }
  }, [userInfo, setUserInfo]);

  // useEffect(() => {
  //   const fetchGigs = async () => {
  //     try {
  //       const response = await axios.get(`/api/gigs/user/${userInfo._id}`);
  //       setGigs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching gigs:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (userInfo) {
  //     fetchGigs();
  //   }
  // }, [userInfo]);

  return (
    <Box p={5} maxW="1200px" mx="auto" mt={10} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Stack direction="column" align="center" spacing={4}>
        <Avatar size="xl" name={userInfo?.name} src={userInfo?.img || "https://bit.ly/broken-link"} />
        <Heading as="h2" size="xl">{userInfo?.name}</Heading>
        {/* <Text fontSize="lg" color="gray.500">{userInfo?.profession}</Text> */}
        <Text fontSize="md" textAlign="center">
          {userInfo?.bio}
        </Text>
      </Stack>
      <Box mt={10}>
        <Heading as="h3" size="lg" mb={5}>My Gigs</Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : gigs.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
            {gigs.map(gig => (
              <GigCard key={gig._id} gig={gig} />
            ))}
          </SimpleGrid>
        ) : (
          <Text>No gigs found.</Text>
        )}
      </Box>
    </Box>
  );
}

export default Profilepage;