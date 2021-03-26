import { useContext, useEffect, useState } from 'react';
import { addFriend } from '../../../actions/userActions';
import IdContext from '../../../context/IdContext';
import UserContext from '../../../context/UserContext';
import './User.scss';

const User = ({
    name,
    email,
    friends,
    userId,
}) => {

    const [isFriend, setIsFriend] = useState(false);

    const { user } = useContext(UserContext);
    const { id } = useContext(IdContext);

    // console.log(friends.some(x => console.log(x.name)));
    useEffect(() => {
        friends.some(x => x.name === name) ? setIsFriend(true) : setIsFriend(false);
    }, [friends, user, name]);

    const handleFriendButton = () => {
        if (!isFriend) {
            console.log(id);
            console.log(userId);
            addFriend(id, userId);
        }

        setIsFriend((prevIsFriend) => !prevIsFriend);
    }

    return (
        <div className="user-container">
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            {user && <button onClick={() => handleFriendButton()} disabled={isFriend} >{isFriend ? 'Friend' : 'Add friend'}</button>}
        </div>
    )
}

export default User;