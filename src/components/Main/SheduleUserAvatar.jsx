import { useState } from 'react';
import getAvatarByEmail from '../../utils/getAvatarByEmail';
const SheduleUserAvatar = ({ email, userName, i, users }) => {
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    <div
      onClick={() => {
        setShowToolTip(!showToolTip);
      }}
      className="schedule_week-location-day"
      key={i}
    >
      <img
        className="schedule_user-avatar"
        src={getAvatarByEmail(email, users)}
        alt="avatar"
      />
      {showToolTip && <span className="schedule_user-name">{userName}</span>}
    </div>
  );
};

export default SheduleUserAvatar;
