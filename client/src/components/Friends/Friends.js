import { useState, useEffect, useContext } from 'react'

import Friend from './Friend';
import config from '../../config';
import IdContext from '../../context/IdContext';
import UserContext from '../../context/UserContext';

import { getFriends } from '../../actions/userActions';

const Friends = ({ history, location }) => {
    const [friends, setFriends] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [lastClicked, setLastClicked] = useState(null);

    const { user } = useContext(UserContext);
    const { id } = useContext(IdContext);

    const pathname = location.pathname;

    //виж по история есето и изпитване по математика утре
    
    useEffect(() => {
        (async () => {
            if (user) {
                //move the logic
                try {
                    const data = await getFriends();
                    const allFriends = data.friends;
                    const firstFriend = allFriends[0]._id;

                    if (allFriends.length > 0) {
                        setFriends(allFriends);
                        setLastClicked(firstFriend);
                        history.push(`/messages/${firstFriend}`);
                    } else {
                        setFriends(null);
                    }

                } catch (error) {
                    console.log(error);
                }
            } else {
                //is not working yet
                // history.push('/auth');
            }
        })()

    }, [user]);

    useEffect(() => {
        // Fetch at first for all conversations and on clicking on friend render current messages
        // Find conversation by user ids and then move the logic in different file

        if (id && lastClicked) {
            history.push(`/messages/${lastClicked}`);
            getMessages(id, lastClicked)
        }

    }, [lastClicked, pathname])

    const getMessages = (userId, friendId) => {
        // to deal with clicking already fetched friend
        fetch(`${config.BASE_URL}user/${userId}/friend/${friendId}`);
    }

    //move to another file
    // fetch('....', {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         users: [user, lastClicked],
    //     })
    // })



    const handleChange = (e) => {
        setMessage(e.target.value);
        console.log(message);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('....', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                users: [user, lastClicked],
                sendingMessage: message,
                sender: user,
            })
        })

        console.log('user id ' + lastClicked);
    }

    return (
        user
            ? friends
                ?
                <div>
                    {friends?.map(x => <Friend key={x._id} name={x.name} userId={x._id} onClick={setLastClicked} lastClicked={lastClicked} />)}
                    <div className="chat-container">
                        {/* Render every message with messages.map(x => <Message />) for current conversation */}
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <textarea className="text-container" onChange={handleChange} placeholder="Aa"></textarea>
                            <input type="submit" value="Send" />
                        </form>
                    </div>
                </div>
                : <h3>There is no friends yet...</h3>
            : <h1>You are not logged in! Add link to go to auth route!</h1>
    )
}

export default Friends;