import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import {AiOutlineComment} from "react-icons/ai"
import Comment from '../comment/Comment';

function CommentModal(props) {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        zIndex={10000}
        centered={true}
      >
        {props.comments.length>0 && 
        props.comments.map((comment,index) => {
            return(
                <Comment key={index} comment={comment.comment} user={comment.user} />
            )
        })
        }
        {props.comments.length == 0 && 
        (
            <p>no comment to show</p>
        )
        }

      </Modal>
      <span onClick={open} className="commments"><AiOutlineComment /> {props.comments.length}</span>
    </>
  );
}

export default CommentModal