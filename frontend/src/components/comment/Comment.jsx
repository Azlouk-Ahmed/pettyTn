import React from 'react'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./comment.css"

function Comment({comment, user}) {
  return (
    <div className='comment'>
        <div className='user-info-wrapper'>
          <img src={(user.img)?"/img/"+user.img : '/img/default.png'}/>
          <div className='user-info'>
            <p>{user.name} - {user.surname}</p>
            {user.createdAt && !isNaN(new Date(user.createdAt)) ? (
                <p>Member from {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>
                ) : null}

          </div>
        </div>
        <p>
        {comment}

        </p>
    </div>
  )
}

export default Comment