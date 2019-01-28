import differenceInYears from 'date-fns/difference_in_years';
import format from 'date-fns/format';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment
} from 'semantic-ui-react';
import { userDetailedQuery } from '../userQueries';

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    user: state.firebase.auth,
    photos: state.firestore.ordered.photos
  };
};

class UserDetailedPage extends Component {
  render() {
    const { user, profile, photos, match } = this.props;
    const age = profile.dateOfBirth
      ? differenceInYears(Date.now(), profile.dateOfBirth.toDate())
      : 'unknown age';
    const isCurrentUser = user.uid === match.params.id;

    return (
      <Grid>
        {/* Header component */}
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  avatar
                  size="small"
                  src={profile.photoURL || '/assets/user.png'}
                />
                <Item.Content verticalAlign="bottom">
                  <Header as="h1">{profile.displayName}</Header>
                  <br />
                  <Header as="h3">{profile.occupation}</Header>
                  <br />
                  <Header as="h3">
                    {age}
                    {', '}
                    {profile.city}
                  </Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>

        {/* About component */}
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon="smile" content={`About ${profile.displayName}`} />
                <p>
                  I am a: <strong>{profile.occupation}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.origin}</strong>
                </p>
                <p>
                  Member Since:{' '}
                  <strong>
                    {profile.createdAt &&
                      format(profile.createdAt.toDate(), 'dddd Do MMMM')}
                  </strong>
                </p>
                <p>{profile.about}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon="heart outline" content="Interests" />
                <List>
                  {profile.interests &&
                    profile.interests.map((interest, key) => (
                      <Item key={key}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))}
                </List>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            {isCurrentUser ? (
              <Button
                color="teal"
                fluid
                basic
                content="Edit Profile"
                as={Link}
                to="/settings"
              />
            ) : (
              <Button color="teal" fluid basic content="Follow User" />
            )}
          </Segment>
        </Grid.Column>

        {/* Photos component */}
        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="image" content="Photos" />

            <Image.Group size="small">
              {photos &&
                photos.map((photo, key) => (
                  <Image key={key} src={photo.url || '/assets/user.png'} />
                ))}
            </Image.Group>
          </Segment>
        </Grid.Column>

        {/* Events component */}
        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Menu secondary pointing>
              <Menu.Item name="All Events" active />
              <Menu.Item name="Past Events" />
              <Menu.Item name="Future Events" />
              <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={'/assets/categoryImages/drinks.jpg'} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    null
  ),
  firestoreConnect((user, userUid) => userDetailedQuery(user, userUid))
)(UserDetailedPage);
