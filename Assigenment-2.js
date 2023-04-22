import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
`;

const Brand = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  border: 2px solid #007bff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${LoaderAnimation} 0.6s ease-in-out infinite;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  border-radius: 50%;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
`;

const Email = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #777;
`;

const UserCardGrid = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Navbar>
        <Brand>Brand Name</Brand>
        <Button onClick={getUsers} disabled={loading}>
          Get Users
          {loading && <Loader />}
        </Button>
      </Navbar>
      <CardGrid>
        {users.map(user => (
          <UserCard key={user.id}>
            <Avatar src={user.avatar} alt={user.first_name} />
            <Name>{`${user.first_name} ${user.last_name}`}</Name>
            <Email>{user.email}</Email>
          </UserCard>
        ))}
      </CardGrid>
    </>
  );
};

export default UserCard
