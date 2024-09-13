// path: /mentorship

import { FeedbackCard } from '@components';

const MentorshipPage = () => {
  return (
    <div>
      <FeedbackCard
        name="Lucy"
        feedback={
          'It is great to be able to share my experience as a newbie in Tech with someone that has more years and experience in the industry. It has definitely made me feel more comfortable with been a completely beginner again and confident that, if a put the hours in, one day it will be pay off.'
        }
        mentee={true}
        year={2024}
      />
    </div>
  );
};

export default MentorshipPage;
