import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "The First Meetups",
    image:
      "https://secure-content.meetupstatic.com/images/classic-events/501750153/676x380.webp",
    address: "test address",
  },
  {
    id: "m2",
    title: "The First Meetups",
    image:
      "https://secure-content.meetupstatic.com/images/classic-events/501573074/676x380.webp",
    address: "test address",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default HomePage;
