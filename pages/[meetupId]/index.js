import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/dist/next-server/lib/head";

import { Fragment } from "react";

const DetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb://bonusversion:gaor5WG2A7NcPj0K@cluster0-shard-00-00.gkbnc.mongodb.net:27017,cluster0-shard-00-01.gkbnc.mongodb.net:27017,cluster0-shard-00-02.gkbnc.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-5qtmtj-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup
  console.log("context", context);
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://bonusversion:gaor5WG2A7NcPj0K@cluster0-shard-00-00.gkbnc.mongodb.net:27017,cluster0-shard-00-01.gkbnc.mongodb.net:27017,cluster0-shard-00-02.gkbnc.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-5qtmtj-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = await db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  };
};

export default DetailPage;
