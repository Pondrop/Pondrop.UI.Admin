import React, { useState } from 'react';

// Implementation
import { useAppSelector } from 'app/hooks';
import { selectUser } from 'features/user/userSlice';

import { lightTheme } from 'theme';
import PageTitle from 'components/PageTitle/PageTitle';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';
import Table from 'components/Table/Table';
import FormInputText from 'components/FormInputText/FormInputText';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Avatar from 'components/Avatar';
import Toggle from 'components/Toggle/Toggle';

import { ReactComponent as IconPencil } from 'assets/icons/icon-pencil.svg';
import avatar1 from 'assets/images/avatar1.png';
import { ProfileSettings } from './styles';

const Profile: React.FunctionComponent = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const [firstName, setFirstName] = useState('Ferrara');
  const [lastName, setLastName] = useState('Clifford');
  const [city, setCity] = useState('Canberra');
  const [theme, setTheme] = useState(false);
  const [profile, setProfile] = useState({
    firstname: false,
    lastname: false,
    city: false,
  });

  const editProfile = (type: 'firstname' | 'lastname' | 'city') => {
    if (type === 'firstname') {
      setProfile({
        lastname: false,
        city: false,
        firstname: !profile.firstname,
      });
    } else if (type === 'lastname') {
      setProfile({
        lastname: !profile.lastname,
        city: false,
        firstname: false,
      });
    } else {
      setProfile({ lastname: false, city: !profile.city, firstname: false });
    }
  };

  return (
    <React.Fragment>
      <PageTitle text="My Profile" />
      <Breadcrumb
        links={[
          { label: 'Register', url: '/register' },
          { label: 'Breadcrumb1', url: '#' },
          { label: 'Breadcrumb2', url: '#' },
        ]}
      />
      {user?.isLogged ? (
        <ProfileSettings>
          <div>
            <Avatar avatars={[avatar1]} variant="square" width="150px" height="150px" />
            <h2>Ferrara Clifford</h2>
          </div>
          <div>
            <Table
              tableData={[
                {
                  label: 'First Name',
                  text: profile.firstname ? (
                    <FormInputText
                      name="firstName"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  ) : (
                    firstName
                  ),
                  icon: (
                    <Button
                      color="primary"
                      startIcon={
                        <Icon strokeColor={lightTheme.primary}>
                          <IconPencil />
                        </Icon>
                      }
                      onClick={() => editProfile('firstname')}
                    />
                  ),
                },
                {
                  label: 'Last Name',
                  text: profile.lastname ? (
                    <FormInputText
                      name="lastName"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  ) : (
                    lastName
                  ),
                  icon: (
                    <Button
                      color="primary"
                      startIcon={
                        <Icon strokeColor={lightTheme.primary}>
                          <IconPencil />
                        </Icon>
                      }
                      onClick={() => editProfile('lastname')}
                    />
                  ),
                },
                {
                  label: 'City',
                  text: profile.city ? (
                    <FormInputText
                      name="city"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  ) : (
                    city
                  ),
                  icon: (
                    <Button
                      color="primary"
                      startIcon={
                        <Icon strokeColor={lightTheme.primary}>
                          <IconPencil />
                        </Icon>
                      }
                      onClick={() => editProfile('city')}
                    />
                  ),
                },
              ]}
              background={theme ? lightTheme.textMedium : lightTheme.bgLight}
              labels={true}
              columnWidth={['40%', '40%', '20%']}
            />
            <div>
              <h6>Theme Preference</h6>
              <Toggle value={theme} color="primary" onChange={() => setTheme(!theme)} />
            </div>
            <ButtonGroup gap={20} inline={true}>
              <>
                <Button
                  label="Save Profile"
                  variant="contained"
                  color="primary"
                  wide
                  centered
                  onClick={() => {
                    alert('details saved');
                    window.location.reload();
                  }}
                />
                <Button label="Cancel" variant="outlined" wide centered color="primary" />
              </>
            </ButtonGroup>
          </div>
        </ProfileSettings>
      ) : (
        <p>Please login</p>
      )}
    </React.Fragment>
  );
};

export default Profile;
