import MeetupItem from "../../components/meetups/MeetupItem";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const DetailPage = () => {
  const router = useRouter();
  const meetupId = router.query.meetupId;

  return (
    <MeetupDetail title="test" img="test" address="test" description="test" />
  );
};

export default DetailPage;
