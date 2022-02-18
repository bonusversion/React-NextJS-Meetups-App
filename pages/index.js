import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

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

// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetching data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb://bonusversion:gaor5WG2A7NcPj0K@cluster0-shard-00-00.gkbnc.mongodb.net:27017,cluster0-shard-00-01.gkbnc.mongodb.net:27017,cluster0-shard-00-02.gkbnc.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-5qtmtj-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = await client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
