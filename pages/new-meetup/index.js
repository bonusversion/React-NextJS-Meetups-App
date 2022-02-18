import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/dist/next-server/lib/head";
import { Fragment } from "react/cjs/react.production.min";

const NewMeetup = () => {
  const addMeetupHandler = async (enteredMeetupData) => {
    console.log("here");
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log("data", data);
  };
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
